import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, Container } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./../theme";
import { position } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    
  } 
}));

function Footer(props) {
  const { user, logoutUser } = props;

  const classes = useStyles();
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Container style={{position: 'relative', minHeight: '100vh'}}>
        <div>
        <BottomNavigation style={{ position: 'absolute', backgroundColor: theme.palette.primary.dark, boxShadow: 'none', margin: 'auto', width: '100%', bottom: 0, left: 0 }}>
          <p>© 2020 LootTracker LLC</p>
        </BottomNavigation>
        </div>
        </Container>
      </MuiThemeProvider>
    </>
  )
}

export default Footer;