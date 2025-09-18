import '@mantine/core/styles.css';

import { Box, ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
//import { Notifications } from '@mantine/notifications';
import { Footer } from '@/components/layouts/Footer';
import { Navbar } from '@/components/layouts/Navbar';
import { AuthProvider } from '../contexts/AuthContext';
import { theme } from '../theme';
import { Providers } from './providers';

export const metadata = {
  title: 'Uber Scrape',
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
          {/* 1. MAIN LAYOUT WRAPPER: This Box handles the sticky footer */}
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh', // Critical for making it at least screen height
              backgroundColor:
                'light-dark(var(--mantine-color-white), var(--mantine-color-dark-9))',
              color: 'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
            }}
          >
            {/* 2. Navbar at the top */}
            <Navbar />

            {/* 3. MAIN CONTENT: This grows to push the footer down */}
            <Box
              component="main"
              style={{
                flex: 1, // This is the magic that makes it grow
                width: '100%', // Ensure it takes full width
                maxWidth: 1250, // Your max width constraint
                marginLeft: 'auto',
                marginRight: 'auto',
                // Apply responsive padding here instead of on the outer container
                paddingLeft: 'var(--mantine-spacing-md)',
                paddingRight: 'var(--mantine-spacing-md)',
                // Override for small/medium screens
                '@media (max-width: 992px)': {
                  paddingLeft: 'var(--mantine-spacing-xs)',
                  paddingRight: 'var(--mantine-spacing-xs)',
                },
              }}
            >
              {/* 4. Container for child content (optional, for inner max-width) */}
              <Providers>
                <MantineProvider>
                  <AuthProvider>{children}</AuthProvider>
                </MantineProvider>
              </Providers>
            </Box>

            {/* 5. FOOTER: This is now pushed to the bottom by the flex:1 above */}
            <Footer />
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
