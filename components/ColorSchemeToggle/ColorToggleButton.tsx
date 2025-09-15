'use client';

import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

export function ColorToggleButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ActionIcon
        variant="outline"
        onClick={() => {}}
        title="Toggle color scheme"
        size="md"
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
        }}
      >
        <MoonIcon style={{ width: 16, height: 16 }} />
      </ActionIcon>
    );
  }

  const isDark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={isDark ? 'yellow' : 'blue'}
      onClick={toggleColorScheme}
      title="Toggle color scheme"
      size="md"
      style={{
        flexShrink: 0,
        width: 32,
        height: 32,
      }}
    >
      {isDark ? (
        <SunIcon style={{ width: 16, height: 16 }} />
      ) : (
        <MoonIcon style={{ width: 16, height: 16 }} />
      )}
    </ActionIcon>
  );
}
