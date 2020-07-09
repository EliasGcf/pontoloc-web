import React, { memo } from 'react';

import { FiSearch } from 'react-icons/fi';
import { UInput } from '../../../../../components/Form';
import SearchButton from '../../../../../components/SearchButton';
import LinkToCreatePage from '../../../../../components/LinkToCreatePage';

import * as S from './styles';

interface SearchFormData {
  name: string;
}

interface SubmitData {
  reset(): void;
}

interface HeaderProps {
  onSubmit(data: SearchFormData, options?: SubmitData): void;
  disabled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSubmit, disabled = false }) => {
  return (
    <S.Header>
      <S.Form onSubmit={onSubmit}>
        <UInput
          placeholder="Buscar"
          icon={FiSearch}
          name="name"
          disabled={disabled}
        />
        <SearchButton
          type="submit"
          style={{ marginLeft: 16 }}
          disabled={disabled}
        />
      </S.Form>

      <LinkToCreatePage to="/contracts/register" />

      <h1>Aluguéis</h1>
    </S.Header>
  );
};

export default memo(Header);
