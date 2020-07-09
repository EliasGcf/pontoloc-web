import styled from 'styled-components';

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
