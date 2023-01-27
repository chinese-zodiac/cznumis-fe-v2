import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { Open_Sans } from '@next/font/google';
import localFont from '@next/font/local';

export const openSans = Open_Sans({ subsets: ['latin'] });
export const texas = localFont({ src: '../public/fonts/TEXAT.otf' });

export default function BaseThemeProvider({ children }) {
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: '#755A3B',
        },
        secondary: {
          main: '#F69809',
        },
        info: {
          main: '#3689D6',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },
      typography: {
        fontFamily: [
          openSans.style.fontFamily,
          texas.style.fontFamily,
          'sans-serif',
        ].join(', '),

        h1: {
          fontSize: '2.25rem',
          fontWeight: 700,
        },
        body1: {
          fontFamily: openSans.style.fontFamily,
        },
      },
    })
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
