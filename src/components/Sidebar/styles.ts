import styled, { css } from 'styled-components';

interface IContainerProps {
  isOpened: boolean;
}

export const Container = styled.div<IContainerProps>`
  max-width: ${props => (props.isOpened ? '250px' : '60px')};
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.shape};

  > div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;

    button {
      background: none;
      height: 100%;
      border: none;
      margin-right: 14px;
      color: ${({ theme }) => theme.colors.white};
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
              padding: 0 14px 0 30px;
              justify-content: space-between;
            `
          : css`
              padding: 0;
              justify-content: center;
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
