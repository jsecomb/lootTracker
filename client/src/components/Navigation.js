import React from "react";
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { Link } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./../theme";
import { makeStyles } from '@material-ui/core/styles';

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

function Navigation(props) {
  const { user, logoutUser } = props;

  const classes = useStyles();
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <AppBar position="fixed" mt={0} mb={12} style={{ backgroundColor: theme.palette.primary.dark, boxShadow: 'none', margin: 'auto' }}>
          <Toolbar mb={10} style={{ maxWidth: '700px', margin: 'auto' }}>

            <Button component={Link} to="/home" className={classes.root}>Home</Button>
            <Button component={Link} to="/wishlist" className={classes.root}>WishList</Button>
            <Button component={Link} to="/wishlistdetails" className={classes.root}>Stats</Button>

            {user.email ?
              <>
                <Button component={Link} to="/home" className={classes.root} onClick={logoutUser} >Logout</Button>
              </>
              :
              <>
                <Button component={Link} to="/signup" className={classes.root}>Signup</Button>
                <Button component={Link} to="/login" className={classes.root}>Login</Button>
              </>
            }
            <Button component={Link} to="/about" className={classes.root}>About</Button>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </>
  )
}

export default Navigation;