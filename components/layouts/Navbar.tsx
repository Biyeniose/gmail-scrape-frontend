'use client';

import React from 'react';
import { Anchor, Box, Group, Text } from '@mantine/core';
import { ColorToggleButton } from '../ColorSchemeToggle/ColorToggleButton';

export function Navbar() {
  const navLinks = [
    { label: 'Tools', href: '/tools' },
    { label: 'Comps', href: '/comps' },
    { label: 'Stats', href: '/stats' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <Box
      component="nav"
      style={{
        backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))',
        color: 'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
        borderBottom: '1px solid var(--mantine-color-default-border)',
        padding: '0 var(--mantine-spacing-md)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Group justify="space-between" h={60} wrap="nowrap">
        {/* Logo Section */}
        <Group gap="sm" wrap="nowrap">
          <Box
            style={{
              width: 32,
              height: 32,
              backgroundColor: 'var(--mantine-color-blue-6)',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Text c="white" fw={700} size="sm">
              L
            </Text>
          </Box>
          <Text size="lg" fw={600} visibleFrom="xs">
            Logo
          </Text>
        </Group>

        {/* Navigation Links - Responsive */}
        <Group
          gap="xs"
          visibleFrom="sm"
          style={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: '0 var(--mantine-spacing-md)',
          }}
          wrap="nowrap"
        >
          {navLinks.map((link) => (
            <Anchor
              key={link.href}
              href={link.href}
              underline="never"
              c="var(--mantine-color-text)"
              fw={500}
              size="sm"
              style={{
                transition: 'color 0.2s ease',
                padding: 'var(--mantine-spacing-xs) var(--mantine-spacing-sm)',
                borderRadius: 'var(--mantine-radius-sm)',
                whiteSpace: 'nowrap',
              }}
              styles={{
                root: {
                  '&:hover': {
                    color: 'var(--mantine-color-blue-6)',
                    backgroundColor: 'var(--mantine-color-default-hover)',
                  },
                },
              }}
            >
              {link.label}
            </Anchor>
          ))}
        </Group>

        {/* Color Toggle - Ensure it doesn't cause overflow */}
        <Box style={{ flexShrink: 0 }}>
          <ColorToggleButton />
        </Box>
      </Group>
    </Box>
  );
}
