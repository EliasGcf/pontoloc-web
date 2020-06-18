import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import {
  BackButton,
  RegisterButton,
  InputLabel,
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
            .typeError('Diária do material é obrigatória')
            .required('Diária do material é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

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

            <RegisterButton onClick={handleButtonSubmit} />
          </section>
        </header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputLabel
            name="name"
            lable_name="material-name"
            label="NOME"
            placeholder="Digite o nome do material"
          />
          <InputLabel
            name="daily_price"
            label="DIÁRIA"
            placeholder="Digite a diária do material"
            type="number"
          />
        </Form>
      </Content>
    </Container>
  );
};

export default CreateMaterial;
