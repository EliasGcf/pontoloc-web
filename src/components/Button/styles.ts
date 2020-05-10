import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
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
