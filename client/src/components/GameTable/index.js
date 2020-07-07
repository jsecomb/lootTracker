import React from 'react';
import API from "../../utils/API";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

var moment = require('moment'); 

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    maxWidth: 800,
    backgroundColor: "#164968"
  }
});

function createData(img, name, price, releaseDate) {
  return { img, name, price, releaseDate };
}

const wishlistData = []

function getWishlistItems(userProfile) {
  API.Wishlist.getAllByUserId(userProfile.user.id).then(function (wishlists) {
    let wishListIds = wishlists.data.map(wishlist => wishlist.id)
    console.log(wishListIds)
    wishListIds.forEach(listId => {
      API.WishlistItem.getAllByWishlistId(listId).then(function (wishlistItems) {
      wishlistData.push(wishlistItems)
      })
    })
  })
}

const rows = [
  createData("https://i.imgur.com/7w8L1Ugt.jpg","Halo 1", 50, moment().format("MMM Do YYYY")),
  createData("https://i.imgur.com/7w8L1Ugt.jpg","Halo 2", 60, moment().format("MMM Do YYYY")),
  createData("https://i.imgur.com/7w8L1Ugt.jpg","Halo 3", 50, moment().format("MMM Do YYYY")),
  createData("https://i.imgur.com/7w8L1Ugt.jpg","Halo 4", 40, moment().format("MMM Do YYYY")),
  createData("https://i.imgur.com/7w8L1Ugt.jpg","Halo 5", 20, moment().format("MMM Do YYYY"))
];

export default function GameTable(props) {

  getWishlistItems(props);

  console.log(wishlistData)

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell id="tableHeader" align="left">Game</TableCell>
            <TableCell id="tableHeader" align="left">Price</TableCell>
            <TableCell id="tableHeader" align="left">Release Date</TableCell>
            <TableCell id="tableHeader" align="left">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" align="left">
                  <img src={row.img} alt={row.name}></img>
              </TableCell>
              <TableCell id="tableCell" align="left">{row.name}</TableCell>
              <TableCell id="tableCell" align="left">${row.price}</TableCell>
              <TableCell id="tableCell" align="left">{row.releaseDate}</TableCell>
              <TableCell id="tableCell" align="left">
                <Button id="removeBtn" variant="contained">Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}