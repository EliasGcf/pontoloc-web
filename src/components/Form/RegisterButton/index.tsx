import React, { ButtonHTMLAttributes } from 'react';
import { FiPlus } from 'react-icons/fi';

import { ButtonContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const RegisterButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <ButtonContainer type="button" onClick={onClick}>
      <FiPlus size={24} />
      CADASTRAR
    </ButtonContainer>
  );
};

export default RegisterButton;
