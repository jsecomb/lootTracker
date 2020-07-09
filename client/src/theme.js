import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme ({
  palette: createPalette ({
    secondary: {
      light: '#402b2e',
      main: '#1b0004', //brown
      dark: '#000000',
      contrastText: '#fff',
    },
    primary: {
      light: '#ffc049',
      main: '#fd8f09', //orange
      dark: '#c46000',
      contrastText: '#1b0004',
    },
    type: 'dark',
  }),
  props: {
    MuiContainer: {
      disableGutters: true,
    },
    body: {
        margin: 0,
    }
  },
  darkMode: true,
});

export default theme;