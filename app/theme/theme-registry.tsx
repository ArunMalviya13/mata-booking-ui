"use client";

import React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaselineExtended from './css-baseline-extended';
import { ThemeProvider, useThemeContext } from './theme-context';

declare module '@mui/material/styles' {
}

export const baseTheme = createTheme({
  palette: {
    mode: 'light' as const,
    primary: {
      main: '#1e40af', // Blue primary
      light: '#3b82f6',
      dark: '#1e3a8a',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#dc2626', // Red accent
      light: '#ef4444',
      dark: '#b91c1c',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000', // Black
      secondary: '#333333',
    },
    error: {
      main: '#dc2626',
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
          boxShadow: '0 2px 8px rgb(0 0 0 / 12%)',
          transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
          fontWeight: 500,
          '&:hover': {
            boxShadow: '0 4px 12px rgb(0 0 0 / 16%)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgb(0 0 0 / 8%)',
          border: '1px solid rgb(0 0 0 / 4%)',
          '&:hover': {
            boxShadow: '0 8px 32px rgb(0 0 0 / 12%)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeContext();

  const themeOverrides = mode === 'dark' ? {
    palette: {
      background: {
        default: '#111111',
        paper: '#1a1a1a',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#2a2a2a',
            color: '#FFFFFF',
            '& fieldset': {
              borderColor: 'rgb(255 255 255 / 20%)',
            },
          },
        },
      },
    },
  } : {
    palette: {
      background: {
        default: '#FFFFFF',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#000000',
        secondary: '#333333',
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#F5F5F5',
            '& fieldset': {
              borderColor: 'rgb(0 0 0 / 12%)',
            },
          },
        },
      },
    },
  };

  const muiTheme = React.useMemo(
    () => createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode,
        ...themeOverrides.palette,
      },
      components: {
        ...baseTheme.components,
        ...themeOverrides.components,
      },
    }),
    [mode, themeOverrides]
  );

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaselineExtended />
      {children}
    </MUIThemeProvider>
  );
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MuiThemeWrapper>
        {children}
      </MuiThemeWrapper>
    </ThemeProvider>
  );
}

