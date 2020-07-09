import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import * as Yup from 'yup';
import { FiPlus } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { InputAsyncSelect } from '../../../../../components/Form';
import api from '../../../../../services/api';

import { MaterialsForm, QuantityInput, AddButton } from './styles';
import getValidationErrors from '../../../../../utils/getValidationErrors';
import { formatPrice } from '../../../../../utils/format';

interface Material {
  id: string;
  quantity: string;
  name: string;
  daily_price: number;
  daily_price_formatted: string;
}

interface Option {
  value: string;
  label: string;
}

interface FormData {
  id: string;
  quantity: string;
}

interface MaterialFormProps {
  addMaterial: React.Dispatch<React.SetStateAction<Material[]>>;
}

const MaterialForm: React.FC<MaterialFormProps> = ({ addMaterial }) => {
  const formRef = useRef<FormHandles>(null);

  const [materialsPagesAvailable, setMaterialsPagesAvailable] = useState(0);
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    async function loadMaterials(): Promise<void> {
      const response = await api.get<Material[]>('/materials');

      const materialsTotalCount = response.headers['x-total-count'];

      setMaterialsPagesAvailable(Math.ceil(materialsTotalCount / 7));
      setMaterials(response.data);
    }

    loadMaterials();
  }, []);

  const materialOptions = useMemo<Option[]>(() => {
    return materials.map(material => ({
      value: material.id,
      label: material.name,
    }));
  }, [materials]);

  const handleLoadMaterialsOptions = useCallback(
    async (inputValue: string, callback) => {
      const data = materialOptions.filter(material =>
        material.label.includes(inputValue),
      );

      if (data.length === 0) {
        const response = await api.get<Material[]>('/materials', {
          params: {
            name: inputValue,
          },
        });

        callback(
          response.data.map(material => ({
            label: material.name,
            value: material.id,
          })),
        );
        return;
      }

      callback(data);
    },
    [materialOptions],
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          id: Yup.string().required('Material é obrigatório'),
          quantity: Yup.string().required('Quantidade é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        const { id, quantity } = data;

        const materialFind = materials.find(
          material => material.id === id,
        ) as Material;

        const addedMaterial = {
          ...materialFind,
          daily_price_formatted: formatPrice(
            Number(data.quantity) * materialFind.daily_price,
          ),
          quantity,
        } as Material;

        addMaterial(state => [...state, addedMaterial]);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [addMaterial, materials],
  );

  return (
    <MaterialsForm ref={formRef} onSubmit={handleSubmit}>
      <InputAsyncSelect
        name="id"
        label="MATERIAL"
        placeholder="Escolha o material"
        noOptionsMessage={() => 'Nenhum material encontrado'}
        defaultOptions={materialOptions}
        loadOptions={handleLoadMaterialsOptions}
      />
      <QuantityInput
        name="quantity"
        label="QUANTIDADE"
        placeholder="Digite a quantidade"
        type="number"
        showErro="border"
        min={1}
      />
      <AddButton type="submit">
        <FiPlus size={24} />
      </AddButton>
    </MaterialsForm>
  );
};

export default MaterialForm;
