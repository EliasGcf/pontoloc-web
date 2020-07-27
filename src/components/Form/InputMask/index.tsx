import React, { useRef, useEffect } from 'react';
import { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';

import { ReactInputMask, Error } from './styles';

interface Props extends InputProps {
  name: string;
}

const InputMask: React.FC<Props> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <Error>{error}</Error>}
    </>
  );
};

export default InputMask;
