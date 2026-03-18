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
      main: '#0f5b78',
      light: '#1fa6b2',
      dark: '#0b2a3c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f2c14e',
      light: '#f6d27b',
      dark: '#d8a73f',
      contrastText: '#0b1216',
    },
    background: {
      default: '#f7f8fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#0b1216',
      secondary: '#2b3a42',
    },
    error: {
      main: '#d76d77',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'var(--font-sora), system-ui, sans-serif',
    h1: {
      fontFamily: 'var(--font-fraunces), serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'var(--font-fraunces), serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'var(--font-fraunces), serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          boxShadow: '0 10px 24px rgb(11 18 22 / 12%)',
          transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
          fontWeight: 600,
          '&:hover': {
            boxShadow: '0 16px 32px rgb(11 18 22 / 16%)',
            transform: 'translateY(-2px)',
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
          borderRadius: 18,
          boxShadow: '0 18px 48px rgb(11 18 22 / 12%)',
          border: '1px solid rgb(11 18 22 / 6%)',
          '&:hover': {
            boxShadow: '0 24px 60px rgb(11 18 22 / 18%)',
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
      primary: {
        main: '#3cc4d0',
        light: '#6fe0ea',
        dark: '#1a7b8d',
        contrastText: '#0b1115',
      },
      secondary: {
        main: '#f2c14e',
        light: '#f6d27b',
        dark: '#d8a73f',
        contrastText: '#0b1115',
      },
      background: {
        default: '#0b1115',
        paper: '#0f1a20',
      },
      text: {
        primary: '#eef5f8',
        secondary: '#c3d0d8',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#eef5f8',
            '&.Mui-disabled': {
              color: 'rgba(238, 245, 248, 0.7)',
              backgroundColor: 'rgba(238, 245, 248, 0.18)',
            },
          },
          contained: {
            color: '#0b1115',
          },
          outlined: {
            borderColor: 'rgb(238 245 248 / 45%)',
            color: '#eef5f8',
            '&:hover': {
              borderColor: 'rgb(238 245 248 / 70%)',
              backgroundColor: 'rgb(238 245 248 / 8%)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#14232b',
            color: '#eef5f8',
            '& fieldset': {
              borderColor: 'rgb(238 245 248 / 20%)',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#c3d0d8',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: '#9fb1bb',
          },
        },
      },
    },
  } : {
    palette: {
      background: {
        default: '#f7f8fa',
        paper: '#ffffff',
      },
      text: {
        primary: '#0b1216',
        secondary: '#2b3a42',
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#eef2f5',
            '& fieldset': {
              borderColor: 'rgb(11 18 22 / 12%)',
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

