import React, { memo, useRef, useCallback } from 'react';

import { FormHelpers, FormHandles } from '@unform/core';
import { InputSearch } from '../Form';
import SearchButton from '../SearchButton';
import LinkToCreatePage from '../LinkToCreatePage';

import * as S from './styles';

interface SearchFormData {
  name: string;
}

interface HeaderProps {
  onSubmit(data: SearchFormData, options?: FormHelpers): void;
  disabled?: boolean;
  initialName?: string | null;
  createPage: string;
  title: string;
  placeholder?: string;
}

const Header: React.FC<HeaderProps> = ({
  initialName,
  onSubmit,
  disabled = false,
  createPage,
  title,
  placeholder,
}) => {
  const formRef = useRef<FormHandles>(null);

  const clearValue = useCallback(() => {
    formRef.current?.reset();
    onSubmit({ name: '' });
  }, [onSubmit]);

  return (
    <S.Header>
      <S.Form
        ref={formRef}
        initialData={{ name: initialName }}
        onSubmit={onSubmit}
      >
        <InputSearch
          placeholder={placeholder}
          name="name"
          disabled={disabled}
          clearValue={clearValue}
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
