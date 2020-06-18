import React from 'react';
import { FiPlus } from 'react-icons/fi';

import { ContainerLink } from './styles';

interface LinkToCreatePageProps {
  to: string;
}

const LinkToCreatePage: React.FC<LinkToCreatePageProps> = ({ to }) => {
  return (
    <ContainerLink to={to}>
      <FiPlus size={24} />
      CADASTRAR
    </ContainerLink>
  );
};

export default LinkToCreatePage;
