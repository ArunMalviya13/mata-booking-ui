import { GlobalStyles, css } from '@mui/material';
import { useThemeContext } from './theme-context';

export default function CssBaselineExtended() {
  const { mode } = useThemeContext();

  return (
    <GlobalStyles
      styles={css`
        :root {
          /* Shadows */
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
          
          /* Borders */
          --border: 1px solid rgb(var(--border-rgb));
          
          /* Theme Colors: Black White Blue Red */
          --black: 0 0 0;
          --white: 255 255 255;
          --blue: 30 64 175;
          --blue-light: 59 130 246;
          --red: 220 38 38;
          --red-light: 239 68 68;
          
          /* Light Mode Defaults */
          --background: 255 255 255;
          --foreground: 0 0 0;
          --muted: 248 250 252;
          --muted-foreground: 51 51 51;
          --popover: 255 255 255;
          --popover-foreground: 0 0 0;
          --card: 255 255 255;
          --card-foreground: 0 0 0;
          --border-rgb: 229 231 235;
        }

        [data-theme='dark'] {
          --background: 17 17 17;
          --foreground: 255 255 255;
          --muted: 26 26 26;
          --muted-foreground: 156 163 175;
          --popover: 26 26 26;
          --popover-foreground: 255 255 255;
          --card: 26 26 26;
          --card-foreground: 255 255 255;
          --border-rgb: 75 85 99;
        }

        * {
          @apply border-border;
          box-sizing: border-box;
        }

        body {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          font-feature-settings: 'rlig' 1, 'calt' 1;
          position: relative;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html, body, #__next {
          height: 100%;
        }

        /* Form Styles */
        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
        }

        .form-field {
          margin-bottom: 1.5rem;
        }

        .form-button {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .form-container {
            padding: 1rem;
          }
        }
      `}
    />
  );
}

