import '@mantine/core/styles.css';

import React from 'react';
import {
  Box,
  ColorSchemeScript,
  Container,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { Footer } from '@/components/layouts/Footer';
import { Navbar } from '@/components/layouts/Navbar';
import { theme } from '../theme';

export const metadata = {
  title: 'Goal Archive',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />

        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <Container
            size="responsive" // This is key for responsive sizing
            style={{
              backgroundColor:
                'light-dark(var(--mantine-color-white), var(--mantine-color-dark-9))',
              color: 'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
              minHeight: '100vh',
              padding: 0, // Remove default container padding
              // Default padding for all screens
              //paddingLeft: 'var(--mantine-spacing-xs)',
              //paddingRight: 'var(--mantine-spacing-xs)',
              // Override for small/medium screens
              '@media (max-width: 992px)': {
                paddingLeft: '2px',
                paddingRight: '2px',
              },
            }}
            maw={1250}
          >
            <Navbar />
            <Box
              component="main"
              style={{
                maxWidth: '100%',
              }}
            >
              {children}
            </Box>
            <Footer />
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
