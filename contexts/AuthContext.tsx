'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  googleTokens: {
    access_token: string | null;
    refresh_token: string | null;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleTokens, setGoogleTokens] = useState({
    access_token: null as string | null,
    refresh_token: null as string | null,
  });

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      //console.log('Full session object:', session);
      //console.log('Provider token exists:', !!session?.provider_token);
      //console.log('Provider refresh token exists:', !!session?.provider_refresh_token);

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.provider_token) {
        setGoogleTokens({
          access_token: session.provider_token ?? null,
          refresh_token: session.provider_refresh_token ?? null,
        });
      }

      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.provider_token) {
        setGoogleTokens({
          access_token: session.provider_token ?? null,
          refresh_token: session.provider_refresh_token ?? null,
        });
      } else {
        setGoogleTokens({
          access_token: null,
          refresh_token: null,
        });
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'email profile https://www.googleapis.com/auth/gmail.readonly',
        redirectTo: `${window.location.origin}/auth/callback`,
        // No prompt parameter = use existing consent if available
      },
    });
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signOut,
        googleTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
