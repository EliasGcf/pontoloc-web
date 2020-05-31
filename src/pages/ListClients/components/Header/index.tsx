import React, { memo } from 'react';

import { FiSearch, FiPlus } from 'react-icons/fi';
import { UInput } from '../../../../components/Form';
import IconButton from '../../../../components/IconButton';

import * as S from './styles';

interface SearchFormData {
  name: string;
}

interface SubmitData {
  reset(): void;
}

interface HeaderProps {
  onSubmit(data: SearchFormData, options?: SubmitData): void;
}

const Header: React.FC<HeaderProps> = ({ onSubmit }) => {
  return (
    <S.Header>
      <S.Form onSubmit={onSubmit}>
        <UInput placeholder="Buscar" icon={FiSearch} name="name" />
        <IconButton type="submit" style={{ marginLeft: 16 }} icon={FiSearch} />
      </S.Form>

      <S.AddButton type="submit">
        <FiPlus size={24} />
        CADASTRAR
      </S.AddButton>

      <h1>Clientes</h1>
    </S.Header>
  );
};

export default memo(Header);
