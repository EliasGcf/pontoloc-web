import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
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
          <QueryParamProvider ReactRouterRoute={Route}>
            <Routes />
          </QueryParamProvider>
        </BrowserRouter>
      </AppProvider>

      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
