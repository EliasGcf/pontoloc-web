import React, { ButtonHTMLAttributes } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

import { ButtonContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  changePageTo: 'increment' | 'decrement';
};

const ChangePageButton: React.FC<ButtonProps> = ({
  disabled = false,
  changePageTo,
  ...rest
}) => {
  return (
    <ButtonContainer type="button" disabled={disabled} {...rest}>
      {changePageTo === 'increment' ? (
        <FiArrowRight size={24} />
      ) : (
        <FiArrowLeft size={24} />
      )}
    </ButtonContainer>
  );
};

export default ChangePageButton;
