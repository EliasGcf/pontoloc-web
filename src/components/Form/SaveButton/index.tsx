import React, { ButtonHTMLAttributes } from 'react';
import { FiCheck } from 'react-icons/fi';

import { ButtonContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
};

const SaveButton: React.FC<ButtonProps> = ({ onClick, isLoading }) => {
  return (
    <ButtonContainer type="button" onClick={onClick} disabled={isLoading}>
      <FiCheck size={24} />
      {isLoading ? 'CARREGANDO ...' : 'SALVAR'}
    </ButtonContainer>
  );
};

export default SaveButton;
