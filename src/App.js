import React from 'react';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { Routes, Route } from 'react-router-dom';
import ReviewDetail from './pages/ReviewDetail';
import ReviewList from './pages/ReviewList';
import ReviewRegister from './pages/ReviewRegister';
import WishList from './pages/WishList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/detail" element={<ReviewDetail />} />
        <Route path="/register" element={<ReviewRegister />} />
        <Route path="/wish" element={<WishList />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
