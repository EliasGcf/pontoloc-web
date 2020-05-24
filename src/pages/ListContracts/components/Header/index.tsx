import React, { memo } from 'react';

import { FiSearch, FiPlus } from 'react-icons/fi';
import { UInput } from '../../../../components/Form';
import IconButton from '../../../../components/IconButton';

import * as S from './styles';

interface ISearchFormData {
  name: string;
}

interface IHeaderProps {
  onSubmit(data: ISearchFormData): void;
}

const Header: React.FC<IHeaderProps> = ({ onSubmit }) => {
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

      <h1>Aluguéis</h1>
    </S.Header>
  );
};

export default memo(Header);
