"use client";

import React, { useState, useEffect } from 'react';

import { ThemeProvider as MUIThemeProvider, createTheme, type Theme } from '@mui/material/styles';

import { useColorScheme } from '@mui/material/styles';
import CssBaselineExtended from './css-baseline-extended';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d4a017', // Gold
    },
    secondary: {
      main: '#f8f4e6',
    },
    background: {
      default: '#ffffff',
    },
    error: {
      main: '#e74c3c', // Red for booked
    },
    accent: {
      main: '#e74c3c',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'var(--shadow-lg)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 'var(--shadow-xl)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'var(--shadow-lg)',
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorSchemeValue = useColorScheme();
  const colorScheme = colorSchemeValue as unknown as 'light' | 'dark' | null;


  useEffect(() => {
    if (colorScheme === 'dark') setMode('dark');
    else if (colorScheme === 'light') setMode('light');
  }, [colorScheme]);


  const muiTheme = React.useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          ...theme.palette,
          mode,
        },
      }),
    [mode],
  );

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaselineExtended />
      {children}
    </MUIThemeProvider>
  );
}

