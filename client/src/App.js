import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Home, WishList, WishListDetails, ExtensionPage, About } from "./pages";
import Auth from "./pages/Auth"
import { Navigation, Error, Footer } from "./components";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./theme";
import CssBaseline from '@material-ui/core/CssBaseline';
import API from './utils/API';

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("")

  useEffect(() => {
    API.Auth.user_data().then(res => {
      if(res.data) {
        setUser(res.data)
        console.log(res.data)
      }
    })
  }, [])

  function loginUser(email, password) {
    const data = {
      email: email,
      password: password
    }
    API.Auth.login(data).then(res => {
      window.localStorage.setItem('user', JSON.stringify(res.data))
      let userData = JSON.parse(window.localStorage.getItem('user'));
      console.log(userData);
      setUser(userData);

    })
  }

  function signupUser(email, password) {
    const data = {
      email: email,
      password: password
    }
    API.Auth.signup(data).then(res => {
      setUser(res.data)
    }).catch(err => {
      setError("Email already taken")
    })
  }

  function logoutUser() {
    API.Auth.logout().then(res => {
      setUser({});
    })
  }

  function clearError() {
    setError("");
  }

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <Container >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Navigation user={user} logoutUser={logoutUser} />
                </Grid>
                <Grid item xs={12}>
                  {error && <Error error={error} clearError={clearError} />}
                </Grid>
                <Grid item xs={12}>
                  <Switch>
                    <Route exact path={["/", "/home"]}>
                      <Home />
                    </Route>
                    <PrivateRoute exact user={user} path={["/wishlist"]}>
                      {user.id && <WishList user={user} />}
                    </PrivateRoute>
                    <PrivateRoute exact user={user} path={["/wishlistdetails"]}>
                      <WishListDetails user={user} />
                    </PrivateRoute>
                    <Route exact user={user} path={["/addGame/*"]}>
                      {user.id && <ExtensionPage user={user} />}
                    </Route>
                    <Route exact path={["/about"]}>
                      <About />
                    </Route>
                    <Route exact path={["/login", "/signup"]}>
                      <Auth
                        user={user}
                        loginUser={loginUser}
                        signupUser={signupUser}
                      />
                    </Route>
                  </Switch>
                </Grid>
              </Grid>
            </Container>
          </Router>
          <Footer user={user} logoutUser={logoutUser}/>
        </CssBaseline>
      </MuiThemeProvider>
    </>
  );
}

function PrivateRoute(props) {
  return (
    <>
      {props.user.email ?
        <Route {...props}>
          {props.children}
        </Route>
        :
        <Redirect to="/login" />
      }
    </>
  )
}

export default App;
