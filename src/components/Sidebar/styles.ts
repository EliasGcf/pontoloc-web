import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface ContainerProps {
  isOpened: boolean;
}

export const Container = styled.div<ContainerProps>`
  max-width: ${props => (props.isOpened ? '250px' : '60px')};
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.shape};
  transition: max-width 500ms ease;

  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;

    button {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      display: flex;
      align-items: center;

      ${props =>
        props.isOpened
          ? css`
              justify-content: flex-end;
              margin-right: 32px;
            `
          : css`
              justify-content: center;
            `}

      color: ${({ theme }) => theme.colors.white};
      transition: color 0.3s;

      &:hover {
        color: ${({ theme }) => theme.colors.yellow};
      }
    }
  }

  nav {
    height: 60px;

    a {
      display: flex;
      align-items: center;

      ${props =>
        props.isOpened
          ? css`
              justify-content: space-between;
              padding: 0 32px;
            `
          : css`
              justify-content: space-around;
            `}

      font-size: 20px;
      font-weight: 500;
      text-decoration: none;

      color: ${({ theme }) => theme.colors.white};

      height: 100%;

      &.active {
        background: ${({ theme }) => theme.colors.background};
      }

      transition: background 0.3s;
      &:hover {
        background: ${({ theme }) => theme.colors.background};
      }
    }
  }
`;

export const SignOutButton = styled.button`
  margin-top: auto;
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;

  color: ${({ theme }) => theme.colors.error};

  strong {
    font-size: 20px;
    margin-right: 16px;
  }

  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => lighten(0.06, theme.colors.error)};
  }
`;
