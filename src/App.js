import React from 'react';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import ReviewScreens from './components/ReviewScreens';
import { Routes, Route } from 'react-router-dom';
import ReviewDetail from './components/ReviewDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ReviewScreens />} />
        <Route path="/detail" element={<ReviewDetail />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
