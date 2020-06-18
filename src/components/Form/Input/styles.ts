import styled, { css } from 'styled-components';

interface ContainerProps {
  isField: boolean;
  isErrored: boolean;
  isFocused: boolean;
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
      props.isFocused &&
      css`
        color: ${props.theme.colors.yellow};
      `}

  ${props =>
    props.isField &&
    css`
      color: ${props.theme.colors.yellow};
    `}

  ${props =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
    `}

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
  }

  svg {
    margin-right: 16px;
  }
`;
