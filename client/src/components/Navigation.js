import React from "react";
import { Button, AppBar, Toolbar, ListItemSecondaryAction } from '@material-ui/core';
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "../theme";

const useStyles = makeStyles({
  root: {
    backgroundColor: 'theme.palette.primary.dark',
    color: props => props.color,
    colorPrimary: 'theme.palette.primary.dark',
    color: "theme.primary.dark",
    color:'theme.palette.primary.dark',
  },  
})

function Navigation(props) {
  const { user, logoutUser } = props;
  const classes = useStyles(props);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        
        <AppBar position="static" p={0} color="primary">
          <Toolbar className={classes.root} color="primary" p={0}>
            <Button  component={Link} to="/home" >Home</Button>
            <Button  component={Link} to="/wishlist" >Wish List</Button>
            <Button  component={Link} to="/wishlistdetail" >Wish List Stats</Button>

            {user.email ?
              <>
                <Button >Logged in as: {user.email}</Button>
                <Button  component={Link} to="/home" onClick={logoutUser} >Logout</Button>
              </>
              :
              <>
                <Button  component={Link} to="/login" >Login</Button>
                <Button  component={Link} to="/signup" >Signup</Button>
              </>
            }
          </Toolbar>
        </AppBar>
      
      </MuiThemeProvider>
    </>
  )
}
// export default withStyles(styles, { withTheme: true })(Navigation);
export default Navigation;