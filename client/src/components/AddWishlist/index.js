import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import "./style.css";
import { useState } from 'react';
import axios from 'axios';
import API from "../../utils/API";
import Swal from 'sweetalert2';

export default function AddWishlist(props) {

  const [formObject, setFormObject] = useState({})
  const [wishlist, setWishlist] = useState([])

  const Swal = require('sweetalert2')

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  }

  function checkWishlistStatus(event) {
    event.preventDefault();
    API.User.getById(props.user.id).then(function (userData) {
      console.log(userData)
      if (userData.data.Wishlists) {
        console.log("updating budget")
        console.log(userData.data.Wishlists)
        modifyBudget(userData.data.Wishlists)
      }
      else {
        console.log("creating wishlits")
        createWishlist()
      }
    })
  }

  function createWishlist() {
    API.Wishlist.create(formObject);
    Swal.fire({
      title: `You have created a wishlist with a budget of $${formObject.budget}.`,
      width: 600,
      confirmButtonText: 'Aye!',
      confirmButtonColor: '#C46000',
      padding: '3em'
    })
  }

  function modifyBudget(data) {
    API.Wishlist.update(data[0].id, formObject).then(function (response) {
      Swal.fire({
        title: `You have updated your budget to $${formObject.budget}.`,
        width: 600,
        confirmButtonText: 'Aye!',
        confirmButtonColor: '#C46000',
        padding: '3em'
      })
      console.log(response)
    })
  }

  return (
      <div style={{ display: "block", margin: "auto", textAlign: "center" }}>
        <form>
          <label htmlFor="budget">Enter your total budget</label><br />
          <input type="text" id="budget" name="budget" onChange={handleInputChange}></input><br />
          <input type="submit" value="Submit" onClick={checkWishlistStatus}></input>
        </form>
      </div>
  )

}

