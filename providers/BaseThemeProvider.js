import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';


export default function BaseThemeProvider({ children }) {
    const theme = createTheme({
        /*palette: {
            primary: {
                light: '#FCEFE6',
                main: '#DE342F',
                dark: '#702624'
            },
            secondary: {
                main: '#0044ff',
            },
            common: {
                black: '#3F3836',
                white: '#F5F5F5'
            },
            // Used by `getContrastText()` to maximize the contrast between
            // the background and the text.
            contrastThreshold: 3,
            // Used by the functions below to shift a color's luminance by approximately
            // two indexes within its tonal palette.
            // E.g., shift from Red 500 to Red 300 or Red 700.
            tonalOffset: 0.2,
        },*/
    });

    return (<ThemeProvider theme={theme}>{children}</ThemeProvider>)
} 