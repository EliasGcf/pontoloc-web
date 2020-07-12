import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { BackButton, RegisterButton } from '../../../components/Form';
import { useToast } from '../../../hooks/toast';

import ContractForm from './components/ContractForm';
import MaterialForm from './components/MaterialForm';
import MaterialsAddedCard from './components/MaterialsAddedCard';

import { Container, Content } from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';

interface Material {
  id: string;
  quantity: string;
  name: string;
  daily_price: number;
  quantity_daily_price_formatted: string;
}

interface ContractFormData {
  client_id: string;
  delivery_price?: string;
}

const CreateContract: React.FC = () => {
  const contractFormRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [materialsAdded, setMaterialsAdded] = useState<Material[]>([]);

  const handleButtonSubmit = useCallback(() => {
    contractFormRef.current?.submitForm();
  }, []);

  const handleSubmit = useCallback(
    async (data: ContractFormData) => {
      try {
        contractFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          client_id: Yup.string().required('Cliente é obrigatório'),
          delivery_price: Yup.string().default('0'),
        });

        await schema.validate(data, { abortEarly: false });

        if (materialsAdded.length === 0) {
          addToast({
            title: 'Adicione materiais a este contrato',
            type: 'error',
          });
          return;
        }

        const { client_id, delivery_price = 0 } = data;

        setSubmitIsLoading(true);
        await api.post('/contracts', {
          client_id,
          delivery_price: Number(delivery_price),
          materials: materialsAdded.map(material => ({
            id: material.id,
            quantity: material.quantity,
          })),
        });

        contractFormRef.current?.reset();
        setMaterialsAdded([]);
        addToast({
          title: 'Contrato criado com sucesso!',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          contractFormRef.current?.setErrors(errors);
        }
      } finally {
        setSubmitIsLoading(false);
      }
    },
    [materialsAdded, addToast],
  );

  return (
    <Container>
      <Content>
        <header>
          <h1>CADASTRO DE ALUGUEL</h1>

          <section>
            <BackButton />

            <RegisterButton
              isLoading={submitIsLoading}
              onClick={handleButtonSubmit}
            />
          </section>
        </header>

        <ContractForm onSubmit={handleSubmit} formRef={contractFormRef} />

        {materialsAdded.length !== 0 && (
          <MaterialsAddedCard materials={materialsAdded} />
        )}

        <MaterialForm addMaterial={setMaterialsAdded} />
      </Content>
    </Container>
  );
};

export default CreateContract;
