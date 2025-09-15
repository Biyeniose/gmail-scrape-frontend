'use client';

import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import { Anchor, Box, Container, Group, Text } from '@mantine/core';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      style={{
        backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))',
        borderTop: '1px solid var(--mantine-color-default-border)',
        paddingTop: 'var(--mantine-spacing-md)',
        paddingBottom: 'var(--mantine-spacing-md)',
      }}
    >
      <Container size="xl">
        <Group justify="space-between" wrap="wrap">
          {/* Left side - Logo and copyright */}
          <Group gap="sm">
            <Box
              style={{
                width: 32,
                height: 32,
                backgroundColor:
                  'light-dark(var(--mantine-color-blue-3), var(--mantine-color-blue-8))',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text c="white" fw={700} size="sm">
                L
              </Text>
            </Box>
            <Text size="sm" c="dimmed">
              © {currentYear} YourBrand. All rights reserved.
            </Text>
          </Group>

          {/* Right side - Social links */}
          <Group gap="sm">
            <Anchor href="https://github.com/yourusername" target="_blank" aria-label="GitHub">
              <IconBrandGithub size={20} />
            </Anchor>
            <Anchor href="https://twitter.com/yourusername" target="_blank" aria-label="Twitter">
              <IconBrandTwitter size={20} />
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
