import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';

export const Container = styled.div`
  width: 100%;
  padding: 0 16px;
`;

export const Content = styled.div`
  max-width: 900px;
  width: 100%;
  background: ${({ theme }) => theme.colors.shape};

  margin: 0 auto;
  margin-top: 64px;
  border-radius: 5px;

  padding: 32px;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 24px;
      font-weight: 500;
    }

    section {
      display: flex;
    }
  }
`;

export const BackButton = styled.button`
  border: none;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;

  margin-right: 16px;

  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  background: ${({ theme }) => theme.colors.gray};

  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

export const CreateButton = styled.button`
  border: none;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  background: ${({ theme }) => theme.colors.yellow};

  display: flex;
  align-items: center;

  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

export const Form = styled(UnForm)`
  margin-top: 32px;

  div {
    display: flex;
    justify-content: space-between;

    & + div {
      margin-top: 16px;
    }

    label {
      width: 100%;

      span {
        display: block;
        font-size: 16px;
        margin-bottom: 8px;

        color: ${({ theme }) => theme.colors.white};
      }

      & + label {
        width: 340px;
        margin-left: 16px;
      }
    }
  }
`;
