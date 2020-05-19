import React from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';

import { UInput } from '../../components/Form';

import * as S from './styles';

const ListContracts: React.FC = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Form onSubmit={data => console.log(data)}>
          <UInput icon={FiSearch} name="search" />
          <S.SearchButton type="submit">
            <FiSearch size={24} />
          </S.SearchButton>
          <S.AddButton type="submit">
            <FiPlus size={24} />
            CADASTRAR
          </S.AddButton>
        </S.Form>
        <h1>Aluguéis</h1>
      </S.Header>
    </S.Container>
  );
};

export default ListContracts;
