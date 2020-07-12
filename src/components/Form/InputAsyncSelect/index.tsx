import React, { useRef, useEffect } from 'react';
import { OptionTypeBase, StylesConfig, Theme } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';

import { LabelContainer } from './styles';

interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
  label: string;
  label_name?: string;
}

const InputAsyncSelect: React.FC<Props> = ({
  name,
  label,
  label_name,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const colourStyles: StylesConfig = {
    control: styles => ({
      ...styles,
      marginTop: 8,
      borderRadius: 10,
      borderColor: error ? '#EE4D64' : '#232129',
      fontSize: 18,
      height: 56,
    }),
    option: styels => ({
      ...styels,
      color: '#F4EDE8',
    }),
  };

  const themeProps = (theme: Theme): Theme => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#666360',
        primary25: '#63532e',
        primary50: '#999591',
        primary75: '#4c9aff',
        danger: '#de350b',
        dangerLight: '#ffbdad',
        neutral0: '#232129',
        neutral5: '#f2f2f2',
        neutral10: '#e6e6e6',
        neutral20: '#cccccc',
        neutral30: '#FBC131',
        neutral40: '#999999',
        neutral50: '#808080',
        neutral60: '#666666',
        neutral70: '#4d4d4d',
        neutral80: '#F4EDE8',
        neutral90: '#1a1a1a',
      },
    };
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value,
          );
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
      setValue: (ref: any, value: any) => {
        ref.select.state.value = value;
      },
      clearValue: (ref: any) => {
        ref.select.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <LabelContainer htmlFor={label_name || name}>
      {label}
      <Select
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        theme={themeProps}
        maxMenuHeight={225}
        styles={colourStyles}
        name={label_name || name}
        id={label_name || name}
        loadingMessage={() => 'Carregando ...'}
        {...rest}
      />
    </LabelContainer>
  );
};

export default InputAsyncSelect;
