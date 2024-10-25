// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Default primary color (blue)
    },
    secondary: {
      main: '#dc004e', // Default secondary color (pinkish-red)
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Default font
  },
  spacing: 8, // Default spacing unit (can be used as theme.spacing(1), theme.spacing(2), etc.)
});

export default theme;
