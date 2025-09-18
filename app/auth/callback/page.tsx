'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Loader, Text } from '@mantine/core';
import { supabase } from '../../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth error:', error);
        router.push('/?error=auth_failed');
        return;
      }

      if (data.session) {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <Center h="100vh">
      <div style={{ textAlign: 'center' }}>
        <Loader size="lg" />
        <Text mt="md">Completing authentication...</Text>
      </div>
    </Center>
  );
}
