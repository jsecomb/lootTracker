import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@material-ui/core';

export default function GameTable(props) {

  const [wishlistRows, setWishlistRows] = useState([]);

  const Swal = require('sweetalert2')

  const useStyles = makeStyles({
    table: {
      minWidth: 320,
      maxWidth: 800,
      backgroundColor: "#424242"
    }
  });

  const classes = useStyles()

  useEffect(() => {
    getWishlistItems(props)
  }, [])

  function getWishlistItems(userProfile) {
    API.Wishlist.getAllByUserId(userProfile.user.id).then(function (wishlists) {
      let wishListId = wishlists.data[0].id
      API.WishlistItem.getAllByWishlistId(wishListId).then(function (wishlistItems) {
        createTableRows(wishlistItems.data)
      })
    })
  }

  function createTableRows(wishlistItems) {
    let wishlistData = [];
    wishlistItems.map(item => {
      let gameData = item.Game
      let gameRowData = {
        name: gameData.title,
        price: gameData.price,
        rating: gameData.rating,
        releaseDate: timeConverter(gameData.releaseDate).substring(0, 11),
        imgLink: gameData.imgLink,
        purchaseDate: item.purchaseDate.substring(0, 10),
        gameId: item.GameId,
        wishlistId: item.id
      }
      wishlistData.push(gameRowData);
    })
    setWishlistRows(wishlistData)
  }

  function removeWishlistItem(item) {
    API.WishlistItem.delete(item.wishlistId).then(function (response) {
      updateTotalCost(item.wishlistId, parseFloat(item.price))
      getWishlistItems(props)
    })
  }

  useEffect(() => {
    getWishlistItems(props);
    props.setReload(false);
  }, [props.reload])

  function updateTotalCost(wishlistId, gamePrice) {
    console.log(wishlistId)
    API.Wishlist.getAllByUserId(props.user.id).then(function (wishlists) {
      let currentTotalCost = parseFloat(wishlists.data[0].totalCost)
      API.Wishlist.update(wishlistId, {totalCost: currentTotalCost - gamePrice})
    })
  }

  return (
    <>
    <h1 style={{textAlign: "center"}}>{props.user.email}'s Wishlist</h1>
    {wishlistRows.length==0 &&
    <h3 style={{textAlign: "center"}}>No games on your wishlist yet. Set a budget and add a game!</h3>
    }
    {wishlistRows.length>0 &&
    <TableContainer id="gameTable" component={Paper}>
      <Table className={classes.table} style={{margin: "auto"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell id="tableHeader" align="left">Game</TableCell>
            <TableCell id="tableHeader" align="left">Price</TableCell>
            <TableCell id="tableHeader" align="left">Rating</TableCell>
            <TableCell id="tableHeader" align="left">Release Date</TableCell>
            <TableCell id="tableHeader" align="left">Purchase Date</TableCell>
            <TableCell id="tableHeader" align="left">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            wishlistRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" align="left">
                  <img src={row.imgLink} alt={row.name}></img>
                </TableCell>
                <TableCell id="tableCell" align="left">{row.name}</TableCell>
                <TableCell id="tableCell" align="left">${row.price}</TableCell>
                <TableCell id="tableCell" align="left">{row.rating}%</TableCell>
                <TableCell id="tableCell" align="left">{row.releaseDate}</TableCell>
                <TableCell id="tableCell" align="left">{row.purchaseDate}</TableCell>
                <TableCell id="tableCell" align="left">
                  <Button id="removeBtn" variant="contained" onClick={() => removeWishlistItem(row)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    }
  </>
  );
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

