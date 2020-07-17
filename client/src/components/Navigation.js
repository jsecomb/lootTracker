import React from "react";
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { Link } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./../theme";

function Navigation(props) {
  
  const { user, logoutUser } = props;
  return (
    <>
      <MuiThemeProvider theme={theme}>
          <AppBar position="fixed" mt={0} mb={12} style={{ backgroundColor: theme.palette.primary.dark}}> 
            <Toolbar mb={10} style={{margin:"auto"}}>
              <Button component={Link} to="/home" >Home</Button>
              <Button component={Link} to="/wishlist" >Wish List</Button>
              <Button component={Link} to="/wishlistdetails" >Stats</Button>

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
      </MuiThemeProvider>
    </>
  )
}

export default Navigation;