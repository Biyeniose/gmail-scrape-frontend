'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    // override dark colors here to change them for all components
    dark: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#28282B',
      '#1C1C1C',
      '#000000',
    ],
  },
  fontFamilyMonospace: 'Menlo, Monaco, Consolas, "Courier New", monospace',
  /* Put your mantine theme override here */
});
