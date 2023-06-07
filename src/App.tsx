import { Container } from '@mui/material';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { AuthProvider } from './components/auth/auth.context';
import AppRoutes from './routes/app-routes.component';
import { Header } from './shared/Header';
import { GlobalStyle, defaultTheme, darkTheme } from './utils';

function App() {
  const [ useDarkTheme, setUseDarkTheme ] = useState(false);

  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : defaultTheme }>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Container>
            <AppRoutes />
          </Container>
        </AuthProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
