import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  img {
    width: 300px;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;

    max-width: 340px;
    width: 100%;

    button {
      font-weight: 500;
    }
  }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.yellow};
  border-radius: 10px;
  height: 56px;
  border: 0;
  margin-top: 30px;
  width: 100%;
  transition: background-color 0.3s;

  color: ${({ theme }) => theme.colors.background};

  &:hover {
    background: ${({ theme }) => shade(0.2, theme.colors.yellow)};
  }
`;
