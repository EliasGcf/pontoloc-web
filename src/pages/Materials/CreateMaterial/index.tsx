import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import {
  BackButton,
  RegisterButton,
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
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

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

        setIsLoading(true);
        await api.post('/materials', data);
        formRef.current?.reset();

        addToast({
          type: 'success',
          title: 'Material cadastrado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de um material',
          description:
            'Ocorreu um error na criação de um material, tente novamente mais tarde!',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <header>
          <h1>CADASTRO DE MATERIAL</h1>

          <section>
            <BackButton />

            <RegisterButton
              isLoading={isLoading}
              onClick={handleButtonSubmit}
            />
          </section>
        </header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputLabel
            name="name"
            label_name="material-name"
            label="NOME"
            placeholder="Digite o nome do material"
          />
          <InputCurrency
            name="daily_price"
            label="DIÁRIA"
            placeholder="R$ 0,00"
          />
        </Form>
      </Content>
    </Container>
  );
};

export default CreateMaterial;
