import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Container } from '@material-ui/core';
import "./style.css";
import { useState, useEffect } from 'react';
import API from "../../utils/API";

export default function AddWishlist(props) {

  const [formObject, setFormObject] = useState({})
  const [wishlistStatus, setWishlistStatus] = useState("Set Wishlist Budget ($)")

  const Swal = require('sweetalert2');

  useEffect(() => {
    getWishlistStatus()
  }, [])

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  }

  function onKeyDown(event) {
    if(event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      checkWishlistStatus();
    }
  }

  function getWishlistStatus() {
    API.User.getById(props.user.id).then(function (userData) {
      if (userData.data.Wishlist) {
        setWishlistStatus("Change Wishlist Budget ($)")
      }
    })
  }

  function checkWishlistStatus() {
    document.getElementById("budgetInput").value = "";
    API.User.getById(props.user.id).then(function (userData) {
      if (isNaN(formObject.budget)) {
        Swal.fire({
          title: `You must enter a number matey.`,
          width: 600,
          confirmButtonText: 'Aye!',
          confirmButtonColor: '#C46000',
          padding: '3em'
        })
      }
      else if (userData.data.Wishlist) {
        modifyBudget(userData.data.Wishlist)
      }
      else {
        createWishlist()
      }
    })
  }

  function createWishlist() {
    props.setReload(true)
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
    props.setReload(true)
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

  const useStyles = makeStyles({
    root: {
      display: 'block',
      margin: 'auto',
      textAlign: 'center',
      height: '100%',
    }
  });

  const classes = useStyles()

  return (
    <>
      <Container>
        <form className={classes.root} noValidate autoComplete="off" id="searchForm">
          <TextField type="text" id="budgetInput" label={wishlistStatus} name="budget" onChange={handleInputChange} onKeyDown={onKeyDown}/>
          <Button variant="contained" id="budgetSubmit" value="Submit" color="primary" onClick={checkWishlistStatus}>Submit</Button>
        </form>
      </Container>
    </>
  )

}

