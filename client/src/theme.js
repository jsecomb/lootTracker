import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
  display: 'block',
  margin: 'auto',
  palette: createPalette({
    secondary: {
      light: '#402b2e',
      main: '#1b0004',      //brown
      dark: '#000000',
      contrastText: '#fff',
    },
    primary: {
      light: '#ffc049',
      main: '#c46000',      //orange
      dark: '#c46000',
      contrastText: '#fff',
    },
    type: 'dark',
  }),
  props: {
    MuiContainer: {
      disableGutters: true,
    },
    MuiToolbar: {
      disableGutters: true,
    }
  },
});

export default theme;