"use client";

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';


export default function Header() {
  // const theme = useTheme();

  const [user, setUser] = useState<any>(null);


  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (typeof window !== 'undefined') setUser(user);
    });
  }, []);



  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-dark))', boxShadow: 'var(--shadow-xl)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} href="/" sx={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
          🛕 Mata Booking
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/my-bookings">
            My Bookings
          </Button>
          <Button color="inherit" component={Link} href="/admin">
            Admin
          </Button>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

