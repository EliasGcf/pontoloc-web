import styled from 'styled-components';

interface IContainerProps {
  isOpened: boolean;
}

export const Container = styled.div<IContainerProps>`
  max-width: ${props => (props.isOpened ? '250px' : '60px')};
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.shape};
  transition: max-width 500ms ease;

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
      justify-content: space-around;

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
