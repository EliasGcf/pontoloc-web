import React, { memo } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormHelpers } from '@unform/core';
import { UInput } from '../Form';
import SearchButton from '../SearchButton';
import LinkToCreatePage from '../LinkToCreatePage';

import * as S from './styles';

interface SearchFormData {
  name: string;
}

interface HeaderProps {
  onSubmit(data: SearchFormData, options?: FormHelpers): void;
  disabled?: boolean;
  clientName?: string | null;
  createPage: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  clientName,
  onSubmit,
  disabled = false,
  createPage,
  title,
}) => {
  return (
    <S.Header>
      <S.Form initialData={{ name: clientName }} onSubmit={onSubmit}>
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

      <LinkToCreatePage to={createPage} />

      <h1>{title}</h1>
    </S.Header>
  );
};

export default memo(Header);
