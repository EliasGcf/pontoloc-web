import styled from 'styled-components';

export const Container = styled.div`
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
