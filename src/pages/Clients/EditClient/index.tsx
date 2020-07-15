import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useParams, useHistory } from 'react-router-dom';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';

import {
  InputLabel,
  InputMask,
  BackButton,
  SaveButton,
} from '../../../components/Form';

import { Container, Content, Form } from './styles';

interface CreateClientFormData {
  name: string;
  cpf: string;
  address: string;
  phone_number: string;
}

const EditClient: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    async function loadClient(): Promise<void> {
      const response = await api.get(`/clients/${id}`);
      formRef.current?.setData(response.data);
      setIsLoading(false);
    }

    loadClient();
  }, [id]);

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

        await api.put(`/clients/${id}`, data);

        history.goBack();
        addToast({
          type: 'success',
          title: 'Cliente atualizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização de um cliente',
          description:
            'Ocorreu um error na atualização do cliente, tente novamente mais tarde!',
        });
      }
    },
    [addToast, history, id],
  );

  return (
    <Container>
      <Content>
        <header>
          <h1>EDIÇÃO DO CLIENTE</h1>

          <section>
            <BackButton />

            <SaveButton isLoading={isLoading} onClick={handleButtonSubmit} />
          </section>
        </header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <InputLabel
              label="NOME COMPLETO"
              id="name"
              name="name"
              placeholder="Digite o nome"
              disabled={isLoading}
            />
            <label htmlFor="cpf">
              CPF
              <InputMask
                maskChar={null}
                mask="999.999.999-99"
                id="cpf"
                name="cpf"
                placeholder="Digite o CPF"
                style={{ marginTop: 8 }}
                disabled={isLoading}
              />
            </label>
          </div>
          <div>
            <InputLabel
              label="ENDEREÇO"
              id="address"
              name="address"
              placeholder="Digite o endereço"
              disabled={isLoading}
            />
            <label htmlFor="phone_number">
              TELEFONE
              <InputMask
                maskChar={null}
                mask="(99) 9.9999-9999"
                id="phone_number"
                name="phone_number"
                placeholder="Digite o telefone"
                style={{ marginTop: 8 }}
                disabled={isLoading}
              />
            </label>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default EditClient;
