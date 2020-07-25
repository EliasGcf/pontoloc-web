import styled, { css } from 'styled-components';
import { FiX } from 'react-icons/fi';

interface ContainerProps {
  isField: boolean;
  isErrored: boolean;
  isDisabled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.grayHard};
  border-radius: 10px;
  padding: 16px;
  height: 56px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      color: ${props.theme.colors.error};
    `}

  ${props =>
    props.isField &&
    css`
      color: ${props.theme.colors.yellow};
    `}

  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'default')};

  &:focus-within {
    color: ${({ theme }) => theme.colors.yellow};
  }

  input {
    flex: 1;
    background: transparent;
    font-size: 18px;
    border: 0;
    color: ${({ theme }) => theme.colors.white};

    &::placeholder {
      color: ${({ theme }) => theme.colors.grayHard};
    }

    &:disabled {
      cursor: not-allowed;
    }

    margin: 0 16px;
  }
`;

export const ClearIcon = styled(FiX)`
  color: ${({ theme }) => theme.colors.error};
  height: 20px;
  width: 20px;
  cursor: pointer;
`;
