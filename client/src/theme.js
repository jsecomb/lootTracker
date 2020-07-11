import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import createSpacing from '@material-ui/core/styles/createSpacing';

const theme = createMuiTheme({

  palette: createPalette({
    type: 'dark',
    darkMode: true,
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
  }),
  overrides: {
    darkMode: true,
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#c46000',
        contrastText: '#1b0004',
        color: '#1b0004',
      },
    },
    MuiPaper: {
      root: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: '20px',
      },
    }
  },
  props: {
    darkMode: true,
  }  
});

export default theme; 