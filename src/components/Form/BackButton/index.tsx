import React, { ButtonHTMLAttributes, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import { ButtonContainer } from './styles';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const BackButton: React.FC<ButtonProps> = ({ ...rest }) => {
  const history = useHistory();

  const handleNavigateBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <ButtonContainer type="button" onClick={handleNavigateBack} {...rest}>
      <FiChevronLeft size={24} />
      VOLTAR
    </ButtonContainer>
  );
};

export default BackButton;
