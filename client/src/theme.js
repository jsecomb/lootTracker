import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
  palette: createPalette({
    secondary: {
      light: '#402b2e',
      main: '#1b0004', //brown
      dark: '#000000',
      contrastText: '#fff',
    },
    primary: {
      light: '#ffc049',
      main: '#c46000', //orange
      dark: '#c46000',
      contrastText: '#fff',
    },
    type: 'dark',
  }),
  props: {
    MuiContainer: {
      disableGutters: true,
    },
  },
//   breakpoints: {
//     keys: {
//       0: "xs",
//       1: "sm",
//       2: "md",
//       3: "lg",
//       4: "xl",
//   },
//   values: {
//     xs: 0,
//     sm: 600,
//     md: 960,
//     lg: 1280,
//     xl: 1920,
//   },
// },
});

export default theme;