import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
   background: ${({ theme }) => theme.colors.background};
   color:  ${({ theme }) => theme.colors.white};
   -webkit-font-smoothing: antialiased;
  }

  body, input, button {
   font-family: 'Roboto-Slab', sans-serif;
   font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
   cursor: pointer;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0px 1000px #232129 inset;
    transition: 'color 9999s ease-out, background-color 9999s ease-out';
    transition-delay: 9999s;
  }
`;
