import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import {
  UInput,
  InputMask,
  BackButton,
  RegisterButton,
} from '../../../components/Form';

import { Container, Content, Form } from './styles';

interface CreateClientFormData {
  name: string;
  cpf: string;
  address: string;
  phone_number: string;
}

const CreateClient: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleButtonSubmit = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleSubmit = useCallback(
    async (data: CreateClientFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          cpf: Yup.string()
            .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' })
            .required('CPF é obrigatório'),
          address: Yup.string().required('Endereço é obrigatório'),
          phone_number: Yup.string()
            .matches(/\(\d{2}\) \d.\d{4}-\d{4}/, {
              message: 'Telefone inválido',
            })
            .required('Telefone é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/clients', data);
        formRef.current?.reset();

        addToast({
          type: 'success',
          title: 'Cliente cadastrado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de um cliente',
          description:
            'Ocorreu um error na criação de um cliente, tente novamente mais tarde!',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <header>
          <h1>CADASTRO DE CLIENTE</h1>

          <section>
            <BackButton />

            <RegisterButton onClick={handleButtonSubmit} />
          </section>
        </header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <span>NOME COMPLETO</span>
              <UInput
                id="name"
                name="name"
                placeholder="Digite o nome"
                showErros
                autoFocus
              />
            </label>
            <label htmlFor="cpf">
              <span>CPF</span>
              <InputMask
                maskChar={null}
                mask="999.999.999-99"
                id="cpf"
                name="cpf"
                placeholder="Digite o CPF"
              />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              <span>ENDEREÇO</span>
              <UInput
                id="address"
                name="address"
                placeholder="Digite o endereço"
                showErros
              />
            </label>
            <label htmlFor="phone_number">
              <span>TELEFONE</span>
              <InputMask
                maskChar={null}
                mask="(99) 9.9999-9999"
                id="phone_number"
                name="phone_number"
                placeholder="Digite o telefone"
              />
            </label>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateClient;
