import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';
import { UInput } from '../../components/Form';

import { Container } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <img src={logoImg} alt="Logo" />
      <Form onSubmit={data => console.log(data)}>
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
