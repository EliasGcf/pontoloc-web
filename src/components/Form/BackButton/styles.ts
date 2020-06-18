import styled from 'styled-components';
import { darken } from 'polished';

export const ButtonContainer = styled.button`
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

  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => darken(0.1, theme.colors.gray)};
  }
`;
