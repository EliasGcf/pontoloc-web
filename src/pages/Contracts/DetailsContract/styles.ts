import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 16px;

  display: flex;
  flex-direction: column;
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

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: auto 0;

  span {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Client = styled.div`
  margin: 56px 0 0 0;

  h1 {
    font-size: 28px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.yellow};
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + section {
      margin-top: 8px;
    }
  }
`;

export const Line = styled.div`
  height: 1px;
  flex: 1;
  margin: 0 16px;
  border-top: ${({ theme }) => `2px dashed ${theme.colors.yellow}`};
`;

export const Contract = styled.div`
  margin: 48px 0 0 0;

  h1 {
    font-size: 28px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.yellow};
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + section {
      margin-top: 8px;
    }
  }
`;
