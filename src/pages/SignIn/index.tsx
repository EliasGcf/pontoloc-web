import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { UInput } from '../../components/Form';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, SubmitButton } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const hisotry = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required(),
          password: Yup.string().required(),
        });

        await schema.validate({ email, password }, { abortEarly: false });

        setIsLoading(true);
        await signIn({ email, password });

        hisotry.push('/contracts');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um error ao fazer login, cheque as credenciais.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [hisotry, signIn, addToast],
  );

  return (
    <Container>
      <img src={logoImg} alt="Logo" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <UInput
          icon={FiMail}
          name="email"
          placeholder="E-mail"
          type="email"
          autoFocus
        />
        <UInput
          icon={FiLock}
          name="password"
          placeholder="Senha"
          type="password"
        />
        <SubmitButton disabled={isLoading} type="submit">
          {isLoading ? 'Carregando...' : 'Entrar'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default SignIn;
