import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Button, TextField } from '@material-ui/core';
import "./style.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import API from "../../utils/API";
import Swal from 'sweetalert2';

export default function AddWishlist(props) {

  const [formObject, setFormObject] = useState({})
  const [wishlistStatus, setWishlistStatus] = useState("Set Wishlist Budget ($)")

  const Swal = require('sweetalert2')

  const useStyles = makeStyles({
    table: {
      minWidth: 500,
      maxWidth: 800,
      backgroundColor: "#424242"
    }
  });

  const classes = useStyles()

  useEffect(()=> {
    getWishlistStatus()
  },[])

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  }

  function getWishlistStatus() {
    API.User.getById(props.user.id).then(function (userData) {
      console.log(userData)
      if (userData.data.Wishlist) {
        setWishlistStatus("Change Wishlist Budget ($)")
      }
    })
  }

  function checkWishlistStatus(event) {
    event.preventDefault();
    API.User.getById(props.user.id).then(function (userData) {

      if(userData.data.Wishlist){
        modifyBudget(userData.data.Wishlist)
      }
      else{
        createWishlist()
      }
    })
  }

  function createWishlist() {
    API.Wishlist.create(formObject);
    setWishlistStatus("Update Budget")
    Swal.fire({
      title: `You have created a wishlist with a budget of $${formObject.budget}.`,
      width: 600,
      confirmButtonText: 'Aye!',
      confirmButtonColor: '#C46000',
      padding: '3em'
    })
  }

  function modifyBudget(data) {
    API.Wishlist.update(data.id, formObject).then(function (response) {
      Swal.fire({
        title: `You have updated your budget to $${formObject.budget}.`,
        width: 600,
        confirmButtonText: 'Aye!',
        confirmButtonColor: '#C46000',
        padding: '3em'
      })
    })
  }

  return (
    <div style={{display:"block", margin:"auto", textAlign:"center"}}>
      <form className={classes.root} noValidate autoComplete="off" id="searchForm">
        <TextField type="text" id="budgetInput" label={wishlistStatus} name="budget" onChange={handleInputChange}/>
        <Button variant="contained" id="budgetSubmit" value="Submit" onClick={checkWishlistStatus}>Submit</Button>
      </form>
    </div>
  )

}

