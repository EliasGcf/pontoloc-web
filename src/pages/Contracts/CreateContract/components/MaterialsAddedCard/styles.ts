import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
`;

export const Content = styled.div`
  margin-top: 16px;
  width: 100%;
  border-radius: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.grayHard}`};

  padding: 16px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 16px;

  tr {
    th {
      font-size: 18px;
      font-weight: 500;
    }

    th:nth-child(1) {
      text-align: left;
      padding-left: 16px;
    }

    th:nth-child(3) {
      text-align: right;
      padding-right: 16px;
    }
  }
`;

export const MaterialRow = styled.tr`
  td {
    height: 40px;
    color: ${({ theme }) => theme.colors.grayHard};
  }

  td:nth-child(1) {
    padding-left: 16px;

    border-radius: 10px 0 0 10px;
  }

  td:nth-child(2) {
    text-align: center;
  }

  td:nth-child(3) {
    text-align: right;
    padding-right: 16px;
  }
  td:nth-child(4) {
    text-align: right;
    padding-right: 32px;
    border-radius: 0 10px 10px 0;
  }

  background: ${({ theme }) => theme.colors.dark};
  font-size: 18px;
`;
