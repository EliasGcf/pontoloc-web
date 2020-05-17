import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/global';
import Routes from './routes';
import AppProvider from './hooks';

import defaultTheme from './styles/themes/default';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppProvider>

      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
