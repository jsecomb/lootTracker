import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import { Container, Grid, TextField, Typography } from '@material-ui/core';
import "./style.css";
import { useState } from 'react';
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import API from "../../utils/API";


export default function AddWishlist() {

  const [formObject, setFormObject] = useState({})

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(formObject);
    API.Wishlist.create(formObject);
  }
  
  return (
    <MuiThemeProvider theme={theme}>
      <Container maxWidth="sm">
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Set Your Budget
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={Event}
                  id="budget"
                  name="getBudget"
                  as="text"
                  type="text"
                  placeholder="Enter Budget Amount"
                  variant="outlined"
                  size="small"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" value="Submit" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
    </MuiThemeProvider>
  )

}

