import { GlobalStyles, css } from '@mui/material';
import { useThemeContext } from './theme-context';

export default function CssBaselineExtended() {
  const { mode } = useThemeContext();

  return (
    <GlobalStyles
      styles={css`
        :root {
          --shadow-sm: 0 2px 10px rgb(11 18 22 / 8%);
          --shadow-md: 0 14px 40px rgb(11 18 22 / 12%);
          --shadow-lg: 0 22px 60px rgb(11 18 22 / 16%);
          --shadow-xl: 0 32px 90px rgb(11 18 22 / 22%);
          --border: 1px solid rgb(var(--border-rgb));
          --background: 247 248 250;
          --foreground: 11 18 22;
          --muted: 238 242 245;
          --muted-foreground: 43 58 66;
          --popover: 255 255 255;
          --popover-foreground: 11 18 22;
          --card: 255 255 255;
          --card-foreground: 11 18 22;
          --border-rgb: 210 220 230;
        }

        [data-theme='dark'] {
          --background: 11 17 21;
          --foreground: 238 245 248;
          --muted: 20 35 43;
          --muted-foreground: 195 208 216;
          --popover: 20 35 43;
          --popover-foreground: 238 245 248;
          --card: 20 35 43;
          --card-foreground: 238 245 248;
          --border-rgb: 52 71 83;
        }

        * {
          @apply border-border;
          box-sizing: border-box;
        }

        body {
          background: transparent;
          color: hsl(var(--foreground));
          font-family: var(--font-sora), system-ui, sans-serif;
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

        @media (max-width: 768px) {
          .form-container {
            padding: 1rem;
          }
        }
      `}
    />
  );
}
