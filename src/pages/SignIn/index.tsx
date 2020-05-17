import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';
import { UInput } from '../../components/Form';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const hisotry = useHistory();

  const handleSubmit = useCallback(
    async ({ email, password }: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required(),
          password: Yup.string().required(),
        });

        await schema.validate({ email, password }, { abortEarly: false });

        await signIn({ email, password });

        hisotry.push('/contracts');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [hisotry, signIn],
  );

  return (
    <Container>
      <img src={logoImg} alt="Logo" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <UInput icon={FiMail} name="email" placeholder="E-mail" type="email" />
        <UInput
          icon={FiLock}
          name="password"
          placeholder="Senha"
          type="password"
        />
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
