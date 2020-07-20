import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@material-ui/core'
import { format } from "date-fns";

var moment = require('moment');

export default function GameTable(props) {

  const [wishlistRows, setWishlistRows] = useState([]);

  const Swal = require('sweetalert2')

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
        purchaseDate: item.purchaseDate,
        gameId: item.GameId,
        wishlistId: item.id,
        steamId: gameData.linkOrId
      }
      wishlistData.push(gameRowData);
    })
    setWishlistRows(wishlistData)
  }

  function removeWishlistItem(item) {
    API.WishlistItem.delete(item.wishlistId).then(
      Swal.fire({
        title: `You have removed ${item.name} from your wishlist.`,
        width: 600,
        confirmButtonText: 'Aye!',
        confirmButtonColor: '#C46000',
        padding: '3em'
      })
    )
    getWishlistItems(props)
  }

  useEffect(() => {
    getWishlistItems(props);
    props.setReload(false);
  }, [props.reload])

  function updateTotalCost(gamePrice) {
    API.Wishlist.getAllByUserId(props.user.id).then(function (wishlists) {
      let currentTotalCost = parseFloat(wishlists.data[0].totalCost)
      let wishlistId = wishlists.data[0].id
      API.Wishlist.update(wishlistId, { totalCost: currentTotalCost + gamePrice })
    })
    props.setReload(true)
  }

  function verifySufficientFunds(game) {
    API.Wishlist.getAllByUserId(props.user.id).then(function (wishlistData) {
      if ((parseFloat(wishlistData.data[0].totalCost) + parseFloat(game.price)) <= parseFloat(wishlistData.data[0].budget)) { //checks if buying game would cause user to go over budget
        createPurchaseDate(game)
      }
      else {
        Swal.fire({
          title: `You must increase your budget to buy ${game.name} from your wishlist.`,
          width: 600,
          confirmButtonText: 'Aye!',
          confirmButtonColor: '#C46000',
          padding: '3em',
        })
      }
    })
  }

  function createPurchaseDate(item) {
    let date = new Date();
    let purchaseDate = date.toString().substring(4, 15)

    API.WishlistItem.update(item.wishlistId, { purchaseDate: purchaseDate }).then(res => {
      if (purchaseDate !== null) {
        Swal.fire({
          title: `You have purchased ${item.name} from your wishlist.`,
          width: 600,
          confirmButtonText: 'Aye!',
          confirmButtonColor: '#C46000',
          padding: '3em',
        })
      }
      updateTotalCost(parseFloat(item.price))
      getWishlistItems(props)
    });
  }

  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      margin: 'auto',
    },
  }));

  const classes = useStyles()

  return (
    <>
      <Grid container item className={classes.root}>
        <div id='h1' style={{ textAlign: "center", paddingTop: '21px' }}>{props.user.email}'s </div>
        <div id='h1' style={{ textAlign: "center" }}>Wishlist</div>
        {wishlistRows.length == 0 &&
          <Grid item style={{ textAlign: "center" }} color='primary' id='h2'>Set your budget above and start adding games to your Wishlist!</Grid>
        }
        {wishlistRows.length > 0 &&
          <TableContainer id="gameTable" component={Paper} className={classes.root}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell id="tableHeader" align="left">Game</TableCell>
                  <TableCell id="tableHeader" align="left">Price</TableCell>
                  <TableCell id="tableHeader" align="left">Rating</TableCell>
                  <TableCell id="tableHeader" align="left">Release</TableCell>
                  <TableCell id="tableHeader" align="left">Purchase</TableCell>
                  <TableCell id="tableHeader" align="left">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlistRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row" align="left">
                      <a href={`https://store.steampowered.com/app/${row.steamId}/`}><img src={row.imgLink} alt={row.name}></img></a>
                    </TableCell>
                    <TableCell id="tableCell" align="left">{row.name}</TableCell>
                    <TableCell id="tableCell" align="left">${row.price}</TableCell>
                    <TableCell id="tableCell" align="left">{row.rating}%</TableCell>
                    <TableCell id="tableCell" align="left">{row.releaseDate.substring(2, 11)}</TableCell>
                    <TableCell id="tableCell">{row.purchaseDate ? `purchased: ${row.purchaseDate}` :
                      <Button id="purchaseBtn" variant="contained" color="primary" onClick={() => verifySufficientFunds(row)}>Purchase</Button>}
                    </TableCell>
                    {!row.purchaseDate ? <TableCell id="tableCell">
                      <Button id="removeBtn" variant="contained" color='primary' onClick={() => removeWishlistItem(row)}>Remove</Button>
                    </TableCell>
                      : <></>}
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Grid>
    </>
  );

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
  };
}

