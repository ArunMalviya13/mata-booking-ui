import { GlobalStyles } from '@mui/material';

export default function CssBaselineExtended() {
  return (
    <GlobalStyles
      styles={{
        ':root': {
          '--shadow-lg': '0 10px 25px rgba(0,0,0,0.1)',
          '--shadow-xl': '0 20px 40px rgba(0,0,0,0.15)',
        },
        body: {
          margin: 0,
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        },
        '*': {
          boxSizing: 'border-box',
        },
        'html, body, #__next': {
          height: '100%',
        },
      }}
    />
  );
}

