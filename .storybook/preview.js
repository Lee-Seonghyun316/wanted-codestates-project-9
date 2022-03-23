import React from 'react';
import { StylesProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/GlobalStyle';
import theme from '../src/theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <GlobalStyle />
        <Story />
      </StylesProvider>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
