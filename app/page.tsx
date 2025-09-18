'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Center, Loader, Stack, Text } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <Stack align="center" justify="center" h="100vh" p="xl">
      <Welcome />

      <Box
        p="xl"
        style={{
          backgroundColor: 'light-dark(#FFFFFF, #1A1B1E)',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '500px',
        }}
      >
        <Text size="lg" mb="md" ff="arial">
          Sign in with Google to see your Uber stats
        </Text>

        <Text size="sm" c="dimmed" mb="xl">
          Connect your Gmail to analyze your Uber ride and food delivery history
        </Text>

        <Button size="lg" onClick={signIn} leftSection="🔗">
          Sign in with Google
        </Button>
      </Box>
    </Stack>
  );
}
