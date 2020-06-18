import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  padding: 0 16px;
  height: 56px;
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.yellow};

  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => shade(0.2, theme.colors.yellow)};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.yellow};
  }
`;
