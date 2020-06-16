import styled, { css } from 'styled-components';

interface ContainerProps {
  isField: boolean;
  isErrored: boolean;
  isFocused: boolean;
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

  input {
    flex: 1;
    background: transparent;
    font-size: 18px;
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

export const Error = styled.small`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.error};
  display: block;
  margin: 8px 0 0 8px;
`;
