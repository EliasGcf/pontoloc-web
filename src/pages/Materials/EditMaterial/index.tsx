import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useParams, useHistory } from 'react-router-dom';

import {
  BackButton,
  SaveButton,
  InputLabel,
  InputCurrency,
} from '../../../components/Form';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';

import { Container, Content, Form } from './styles';

interface CreateMaterialFormData {
  name: string;
  daily_price: string;
}

const CreateMaterial: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<FormHandles>(null);

  const { id } = useParams();
  const history = useHistory();
  const { addToast } = useToast();

  const handleButtonSubmit = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleSubmit = useCallback(
    async (data: CreateMaterialFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do material é obrigatório'),
          daily_price: Yup.number()
            .min(0, 'Valor mínimo é R$ 0,00')
            .typeError('Diária do material é obrigatória')
            .required('Diária do material é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.put(`/materials/${id}`, { daily_price: data.daily_price });

        history.goBack();
        addToast({
          type: 'success',
          title: 'Material atualizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do material',
          description:
            'Ocorreu um error na atualização do material, tente novamente mais tarde!',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast, history, id],
  );

  useEffect(() => {
    async function loadMaterial(): Promise<void> {
      const response = await api.get(`/materials/${id}`);

      formRef.current?.setData(response.data);
      setIsLoading(false);
    }

    loadMaterial();
  }, [id]);

  return (
    <Container>
      <Content>
        <header>
          <h1>CADASTRO DE MATERIAL</h1>

          <section>
            <BackButton />

            <SaveButton isLoading={isLoading} onClick={handleButtonSubmit} />
          </section>
        </header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputLabel
            name="name"
            label_name="material-name"
            label="NOME"
            placeholder="Digite o nome do material"
            disabled={isLoading}
          />
          <InputCurrency
            name="daily_price"
            label="DIÁRIA"
            placeholder="R$ 0,00"
            disabled={isLoading}
          />
        </Form>
      </Content>
    </Container>
  );
};

export default CreateMaterial;
