import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { NumberFormatProps } from 'react-number-format';

import { NumberFormat, LabelContainer } from './styles';

interface Props extends NumberFormatProps {
  name: string;
  label: string;
  label_name?: string;
}

const InputCurrency: React.FC<Props> = ({
  name,
  label,
  label_name,
  className,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const NumberFormatRef = useRef(null);
  const { fieldName, defaultValue = '', error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: NumberFormatRef.current,
      getValue: ref => {
        return ref.state.numAsString ? Number(ref.state.numAsString) : '';
      },
      setValue: (ref, value) => {
        ref.state.value = `R$ ${value}`;
        ref.state.numAsString = `${value}`;
        if (inputRef.current) inputRef.current.value = `R$ ${value}`;
      },
      clearValue: ref => {
        ref.state.value = '';
        ref.state.numAsString = '';
        if (inputRef.current) inputRef.current.value = '';
      },
    });
  }, [fieldName, inputRef, registerField]);

  return (
    <LabelContainer htmlFor={label_name || name} className={className}>
      {label}
      <NumberFormat
        getInputRef={inputRef}
        ref={NumberFormatRef}
        placeholder="R$ 0,00"
        prefix="R$ "
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
        defaultValue={defaultValue}
        allowNegative={false}
        name={label_name || name}
        id={label_name || name}
        {...rest}
      />
      {error && <span>{error}</span>}
    </LabelContainer>
  );
};

export default InputCurrency;
