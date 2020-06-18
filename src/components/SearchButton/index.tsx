import React, { ButtonHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const SearchButton: React.FC<ButtonProps> = ({ ...rest }) => {
  return (
    <Container {...rest}>
      <FiSearch size={24} />
    </Container>
  );
};

export default SearchButton;
