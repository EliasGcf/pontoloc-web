import styled from 'styled-components';
import { Form as UForm } from '@unform/web';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

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

export const AddLink = styled(Link)`
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

  text-decoration: none;

  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => lighten(0.1, theme.colors.grayHard)};
  }

  svg {
    margin-right: 8px;
  }
`;
