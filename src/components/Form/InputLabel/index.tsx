import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { LabelContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  lable_name?: string;
}

const InputLabel: React.FC<InputProps> = ({
  name,
  label,
  lable_name = '',
  className,
  ...rest
}) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <LabelContainer htmlFor={lable_name || name} className={className}>
      {label}
      <input
        name={lable_name || name}
        id={lable_name || name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </LabelContainer>
  );
};

export default InputLabel;
