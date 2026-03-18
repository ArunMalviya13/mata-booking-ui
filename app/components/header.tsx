"use client";

import Brightness6Icon from '@mui/icons-material/Brightness6';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { isAdmin } from '../../lib/utils';
import { useThemeContext } from '../theme/theme-context';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Poojas', href: '/poojas' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'My Bookings', href: '/my-bookings' },
];

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const { mode, toggleTheme } = useThemeContext();

  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (typeof window !== 'undefined' && user) {
        setUser(user);
        const admin = await isAdmin(user.id);
        setIsAdminUser(admin);
      } else {
        setUser(null);
        setIsAdminUser(false);
      }
    });
  }, []);

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      {navItems.map((item) => (
        <Button
          key={item.href}
          component={Link}
          href={item.href}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            my: 1,
            ...(pathname === item.href && {
              fontWeight: 700,
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: 4,
              px: 1
            })
          }}
          onClick={handleDrawerToggle}
        >
          {item.label}
        </Button>
      ))}
      {isAdminUser && (
        <Button
          component={Link}
          href="/admin"
          fullWidth
          sx={{
            my: 1,
            justifyContent: 'flex-start',
            ...(pathname === '/admin' && {
              fontWeight: 700,
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: 4,
              px: 1
            })
          }}
        >
          Admin
        </Button>
      )}
      {user ? (
        <Button fullWidth sx={{ justifyContent: 'flex-start', my: 1 }} onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button fullWidth sx={{ justifyContent: 'flex-start', my: 1 }} onClick={handleLogin}>
          Login
        </Button>
      )}
    </Box>
  );

  return (
    <AppBar position="static"
      sx={{
        background: 'var(--nav-gradient)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1200
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 1, px: { xs: 2, md: 6 } }}>
        <Typography variant="h6" component={Link} href="/" sx={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', flexShrink: 0 }}>
          🛕 Mata Pooja Booking
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {!isMobile ? (
            <>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  color="inherit"
                  component={Link}
                  href={item.href}
                  sx={{
                    ...(pathname === item.href && {
                      fontWeight: 700,
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      borderRadius: 4,
                      px: 1
                    })
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {isAdminUser && (
                <Button
                  color="inherit"
                  component={Link}
                  href="/admin"
                  sx={{
                    ...(pathname === '/admin' && {
                      fontWeight: 700,
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      borderRadius: 4,
                      px: 1
                    })
                  }}
                >
                  Admin
                </Button>
              )}
              {user ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
              )}
            </>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            onClick={toggleTheme}
            title={`Switch to ${mode === 'light' ? 'dark' : 'light'} theme`}
            sx={{ ml: 1 }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <Brightness6Icon />}
          </IconButton>
        </Box>
      </Toolbar>

      {isMobile && (
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { boxShadow: 24 } }}
        >
          {drawer}
        </Drawer>
      )}
    </AppBar>
  );
}



