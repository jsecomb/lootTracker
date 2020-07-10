import React from "react";
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "../theme";

function Navigation(props) {

  const { user, logoutUser } = props;
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <AppBar position="static" style={{ backgroundColor: theme.palette.primary.dark}}> 
            <Toolbar>
              <Button component={Link} to="/home" >Home</Button>
              <Button component={Link} to="/wishlist" >Wish List</Button>
              <Button component={Link} to="/wishlistdetails" >Wish List Stats</Button>

              {user.email ?
                <>
                  <Button >Logged in as: {user.email}</Button>
                  <Button component={Link} to="/home" onClick={logoutUser} >Logout</Button>
                </>
                :
                <>
                  <Button component={Link} to="/login" >Login</Button>
                  <Button component={Link} to="/signup" >Signup</Button>
                </>
              }
            </Toolbar>
          </AppBar>
        </CssBaseline>
      </MuiThemeProvider>
    </>
  )
}

export default Navigation;