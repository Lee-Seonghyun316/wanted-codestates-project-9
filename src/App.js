import React from 'react';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import ReviewListPage from './components/ReviewListPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ReviewListPage />
    </ThemeProvider>
  );
}

export default App;
