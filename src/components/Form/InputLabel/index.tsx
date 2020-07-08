import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { LabelContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  label_name?: string;
}

const InputLabel: React.FC<InputProps> = ({
  name,
  label,
  label_name = '',
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
    <LabelContainer htmlFor={label_name || name} className={className}>
      {label}
      <input
        name={label_name || name}
        id={label_name || name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </LabelContainer>
  );
};

export default InputLabel;
