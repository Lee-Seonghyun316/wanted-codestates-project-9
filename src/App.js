import React from 'react';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import ReviewScreens from './components/ReviewScreens';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ReviewScreens />
    </ThemeProvider>
  );
}

export default App;
