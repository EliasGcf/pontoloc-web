import styled from 'styled-components';
import { shade } from 'polished';

interface FinishedFilterButtonProps {
  isSelected: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 16px;

  /* padding: 60px 48px 0; */
  /* padding: 60px 135px 0 55px; */
`;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  padding-top: 60px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  span {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 24px;

  tr {
    th {
      font-size: 18px;
      font-weight: 500;
    }

    th:nth-child(1) {
      text-align: left;
      padding-left: 16px;
    }

    th:nth-child(4) {
      text-align: right;
      padding-right: 16px;
    }
  }
`;

export const ClientRow = styled.tr`
  td {
    height: 56px;
  }

  td:nth-child(1) {
    padding-left: 16px;

    border-radius: 10px 0 0 10px;
  }

  td:nth-child(2) {
    text-align: center;
  }
  td:nth-child(3) {
    text-align: center;
  }

  td:nth-child(4) {
    text-align: right;
    padding-right: 16px;
    border-radius: 0 10px 10px 0;
  }

  background: ${({ theme }) => theme.colors.shape};
  font-size: 16px;

  transition: background 0.3s;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => shade(0.4, theme.colors.shape)};
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 60px;

  position: relative;

  div {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    right: 50%;
  }
`;

export const FinishedFilterButton = styled.button<FinishedFilterButtonProps>`
  height: 46px;
  border: none;
  padding: 0 8px 0 16px;
  border-radius: 10px 0 0 10px;

  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background 0.3s, color 0.3s;

  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.yellow : theme.colors.dark};

  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.dark : theme.colors.white};

  &:hover {
    background: ${({ theme, isSelected }) =>
      !isSelected && shade(0.5, theme.colors.yellow)};
  }

  cursor: ${({ isSelected }) => (isSelected ? 'not-allowed' : 'pointer')};

  & + button {
    border-radius: 0 10px 10px 0;
    padding: 0 16px 0 8px;
  }
`;
