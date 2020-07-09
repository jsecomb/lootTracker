import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import "./style.css";
import { useState } from 'react';
import axios from 'axios';
import API from "../../utils/API";
//import { MuiThemeProvider } from '@material-ui/core/styles';
//import theme from "../../utils/theme"

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
    <div>
      <form>
        <label for="budget">Enter your total budget</label><br/>
        <input type="text" id="budget" name="budget" onChange={handleInputChange}></input><br/>
        <input type="submit" value="Submit" onClick={handleFormSubmit}></input>
      </form>
    </div>
  )

}

