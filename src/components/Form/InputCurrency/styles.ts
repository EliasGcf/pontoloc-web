import styled from 'styled-components';
import ReactNumberFormat from 'react-number-format';

export const LabelContainer = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};

  input {
    margin-top: 8px;
    background: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.white};
    font-size: 18px;
    border: none;
    border-radius: 10px;
    padding: 16px;
    height: 56px;
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.grayHard};
    }

    &[type='number'] {
      ::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
        appearance: none;
      }
    }
  }

  span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.error};
    display: block;
    margin: 8px 0 0 8px;
  }
`;

export const NumberFormat = styled(ReactNumberFormat)``;
