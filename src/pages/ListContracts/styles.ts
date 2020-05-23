import styled from 'styled-components';
import { shade, lighten } from 'polished';

import { Form as UForm } from '@unform/web';
import IconButton from '../../components/IconButton';

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding-top: 60px;
  margin: 0 auto;
  /* padding: 60px 48px 0; */
  /* padding: 60px 135px 0 55px; */
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 56px;

  h1 {
    font-weight: normal;
    font-size: 32px;
    margin-left: auto;
  }
`;

export const Form = styled(UForm)`
  display: flex;
  max-width: 415px;
  width: 100%;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 56px;
  margin-left: 16px;

  font-weight: 500;
  font-size: 18px;

  border: none;
  border-radius: 10px;
  padding: 0 16px;

  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.grayHard};

  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => lighten(0.1, theme.colors.grayHard)};
  }

  svg {
    margin-right: 8px;
  }
`;

export const TableHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 18px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 24px;
`;

export const ThName = styled.th`
  width: 400px;
  text-align: left;
  padding-left: 16px;
`;

export const ThDate = styled.th``;

export const ThDaily = styled.th`
  width: 400px;
  text-align: right;
  padding-right: 16px;
`;

export const ClientRow = styled.tr`
  td:nth-child(1) {
    width: 400px;
    padding-left: 16px;
    height: 56px;

    border-radius: 10px 0 0 10px;
  }

  td:nth-child(2) {
    text-align: center;
    height: 56px;
  }

  td:nth-child(3) {
    width: 400px;
    height: 56px;

    text-align: right;
    padding-right: 16px;
    border-radius: 0 10px 10px 0;
  }

  background: ${({ theme }) => theme.colors.shape};
  font-size: 16px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const pageButton = styled(IconButton)`
  height: 46px;
`;
