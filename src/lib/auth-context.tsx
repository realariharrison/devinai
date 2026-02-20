'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase, isDemoMode } from './supabase';
import { demoUser, demoProfile } from './demo-data';
import type { Profile } from './types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isDemo: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if we're in demo mode
    if (isDemoMode()) {
      setIsDemo(true);
      // Don't auto-login in demo mode - require going through login page
      setLoading(false);
      return;
    }

    // Safety timeout - ensure loading never hangs forever
    const timeout = setTimeout(() => {
      console.warn('Auth initialization timeout - forcing loading to false');
      setLoading(false);
    }, 5000);

    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth getSession error:', error);
          setLoading(false);
          return;
        }

        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);

          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }

          setLoading(false);
        }
      );
      subscription = data.subscription;
    } catch (error) {
      console.error('Auth state change listener error:', error);
    }

    return () => {
      clearTimeout(timeout);
      subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // Profile might not exist - RLS might block or no row yet
        setProfile(null);
        return;
      }

      console.log('Profile loaded:', data?.role);
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
    if (isDemo) {
      // In demo mode, set the demo user when signing in
      setUser(demoUser as unknown as User);
      setProfile(demoProfile);
      return { error: null };
    }

    // Add timeout to prevent hanging forever
    const timeoutMs = 15000;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Sign in timeout - please try again')), timeoutMs)
    );

    try {
      const signInPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });

      const { data, error } = await Promise.race([signInPromise, timeoutPromise]);

      if (error) {
        return { error };
      }

      // If sign-in succeeded, fetch profile with its own timeout
      if (data.user) {
        setUser(data.user);
        // Don't block on profile fetch - do it in background
        fetchProfile(data.user.id).catch(console.error);
      }

      return { error: null };
    } catch (err) {
      console.error('Sign in error:', err);
      // Return a mock AuthError for timeout
      return {
        error: {
          message: err instanceof Error ? err.message : 'Sign in failed',
          status: 500,
        } as AuthError,
      };
    }
  };

  const signInWithMagicLink = async (email: string) => {
    if (isDemo) {
      // In demo mode, set the demo user when signing in
      setUser(demoUser as unknown as User);
      setProfile(demoProfile);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (isDemo) {
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    return { error };
  };

  const signOut = async () => {
    if (isDemo) {
      // In demo mode, clear the user and redirect to home
      setUser(null);
      setProfile(null);
      window.location.href = '/';
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    // Redirect to home page after sign out
    window.location.href = '/';
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (isDemo) {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return { error: null };
    }

    if (!user) {
      return { error: new Error('No user logged in') };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isDemo,
        isAdmin,
        signIn,
        signInWithMagicLink,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
