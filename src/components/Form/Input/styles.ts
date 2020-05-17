import styled, { css } from 'styled-components';

interface IContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.grayHard};
  border-radius: 10px;
  padding: 16px;
  height: 56px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.dark};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.error};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.yellow};
    `}

    ${props =>
      props.isField &&
      css`
        color: ${props.theme.colors.yellow};
      `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.white};

    &::placeholder {
      color: ${({ theme }) => theme.colors.grayHard};
    }
  }

  svg {
    margin-right: 16px;
  }
`;
