import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import "./style.css";
import { useState } from 'react';
import axios from 'axios';
import API from "../../utils/API";
import Swal from 'sweetalert2'
//import { MuiThemeProvider } from '@material-ui/core/styles';
//import theme from "../../utils/theme"

export default function AddWishlist() {

  const [formObject, setFormObject] = useState({})

  const Swal = require('sweetalert2')

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(formObject);
    API.Wishlist.create(formObject);
    Swal.fire({
      title: `You have created a wishlist with a budget of $${formObject.budget}.`,
      width: 600,
      confirmButtonText: 'Aye!',
      confirmButtonColor: '#C46000',
      padding: '3em'
    })
  }
  return (
    <div style={{display:"block", margin:"auto", textAlign:"center"}}>
      <form>
        <label htmlFor="budget">Enter your total budget</label><br/>
        <input type="text" id="budget" name="budget" onChange={handleInputChange}></input><br/>
        <input type="submit" value="Submit" onClick={handleFormSubmit}></input>
      </form>
    </div>
  )

}

