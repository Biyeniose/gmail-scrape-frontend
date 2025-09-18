'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../lib/api';

export default function Dashboard() {
  const { user, googleTokens, signOut, loading } = useAuth();
  const router = useRouter();

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ['email-stats', user?.id],
    queryFn: () => {
      if (!googleTokens.access_token || !user?.id) {
        throw new Error('No tokens available');
      }
      // Type assertion since we've checked above
      return apiService.getEmailStats(
        {
          access_token: googleTokens.access_token,
          refresh_token: googleTokens.refresh_token,
        },
        user.id
      );
    },
    enabled: !!googleTokens.access_token && !!user?.id,
  });

  const { data: emails, isLoading: emailsLoading } = useQuery({
    queryKey: ['uber-emails', user?.id],
    queryFn: () => {
      if (!googleTokens.access_token || !user?.id) {
        throw new Error('No tokens available');
      }
      // Type assertion since we've checked above
      return apiService.getUberEmails(
        {
          access_token: googleTokens.access_token,
          refresh_token: googleTokens.refresh_token,
        },
        user.id
      );
    },
    enabled: !!googleTokens.access_token && !!user?.id,
  });

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between">
          <div>
            <Title order={1}>Uber Dashboard</Title>
            <Text c="dimmed">Welcome back, {user.email}</Text>
          </div>
          <Button variant="subtle" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Group>

        {/* Stats Cards */}
        {statsLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : statsError ? (
          <Card withBorder>
            <Text c="red">Error loading stats: {statsError.message}</Text>
          </Card>
        ) : stats ? (
          <Grid>
            <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
              <Card withBorder h="100%">
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Total Emails
                </Text>
                <Text fw={700} size="xl">
                  {stats.total_uber_emails}
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
              <Card withBorder h="100%">
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Uber Rides
                </Text>
                <Text fw={700} size="xl" c="blue">
                  {stats.uber_rides}
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
              <Card withBorder h="100%">
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Uber Eats
                </Text>
                <Text fw={700} size="xl" c="green">
                  {stats.uber_eats}
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
              <Card withBorder h="100%">
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Total Spent
                </Text>
                <Text fw={700} size="xl" c="red">
                  ${stats.total_spent} {stats.currency}
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        ) : null}

        {/* Recent Emails */}
        <Card withBorder>
          <Title order={3} mb="md">
            Recent Uber Emails
          </Title>
          {emailsLoading ? (
            <Center>
              <Loader />
            </Center>
          ) : emails ? (
            <Text>Found {emails.total_count} Uber emails</Text>
          ) : (
            <Text c="dimmed">No emails found</Text>
          )}
        </Card>
      </Stack>
    </Container>
  );
}
