import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';
import { FiSearch } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, ClearIcon } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  disabled?: boolean;
  clearValue(): void;
}

const InputSearch: React.FC<InputProps> = ({
  name,
  disabled = false,
  clearValue,
  ...rest
}) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isField, setIsField] = useState(!!defaultValue);

  const handleInputBlur = useCallback(() => {
    setIsField(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: ref => {
        setIsField(!!ref.value);
        return ref.value;
      },
      setValue: (ref, value) => {
        ref.value = value;
        setIsField(true);
      },
      clearValue: ref => {
        ref.value = '';
        setIsField(false);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isDisabled={disabled} isErrored={!!error} isField={isField}>
      <FiSearch size={20} />
      <input
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        disabled={disabled}
        {...rest}
      />
      {isField && <ClearIcon onClick={clearValue} />}
    </Container>
  );
};

export default InputSearch;
