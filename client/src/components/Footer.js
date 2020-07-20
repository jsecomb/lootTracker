import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./../theme";

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '.75rem',
      paddingLeft: '3px',
      paddingRight: '3px',
      minWidth: '65px',
      margin: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  }
}));

function Footer(props) {
  const { user, logoutUser } = props;

  const classes = useStyles();
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <BottomNavigation position="fixed" mt={0} mb={12} style={{ backgroundColor: theme.palette.primary.dark, boxShadow: 'none', margin: 'auto', width: '100%' }}>
          <p>© 2020 LootTracker LLC</p>
        </BottomNavigation>
      </MuiThemeProvider>
    </>
  )
}

export default Footer;