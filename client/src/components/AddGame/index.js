import React from 'react';
import "./style.css";
import { useState } from 'react';
import axios from 'axios'
import API from "../../utils/API"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function AddGame(props) {

  const [gameString, setGameString] = useState("");
  const [gameResults, setGameResults] = useState([]);

  const Swal = require('sweetalert2')

  const useStyles = makeStyles({
    table: {
      minWidth: 320,
      maxWidth: 800,
      backgroundColor: "#424242",
      textAlign: "center"
    }
  });

  const classes = useStyles()

  function handleInputChange(event) {
    setGameString(event.target.value)
  }

  function getGame() {

    axios({
      "method": "GET",
      "url": "https://www.cheapshark.com/api/1.0/deals",
      "params": {
        "limit": "60",
        "title": gameString
      }
    })
      .then((response) => {
        let gamesList = response.data.sort(function (a, b) { return a.steamAppID - b.steamAppID });
        let filteredGamesList = [];
        let steamIds = []
        for (let i = 0; i < gamesList.length - 1; i++) {
          if (!steamIds.includes(gamesList[i].steamAppID)) {
            filteredGamesList.push(gamesList[i])
            steamIds.push(gamesList[i].steamAppID)
          }
        }
        filteredGamesList = filteredGamesList.filter(game => game.steamAppID)
        setGameResults(filteredGamesList);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getWishlistStatus(game) {
    API.User.getById(props.user.id).then(function (userData) {
      if (userData.data.Wishlist) {
        postGame(game)
      }
      else {
        (async () => {
          const { value: spend } = await Swal.fire({
            title: 'Enter your total gaming budget',
            input: 'number',
            inputPlaceholder: 'Budget ($)',
            confirmButtonText: 'Aye!',
            confirmButtonColor: '#C46000'
          })
          if (spend) {
            API.Wishlist.create({budget: spend}).then(() => {
              Swal.fire(`Your gaming budget is $${spend}`)
              postGame(game)
            })
          }
        })()
      }
    })
  }

  function postGame(game) {
    setGameResults([]);
    let newGameInfo =
    {
      title: game.title,
      price: game.normalPrice,
      releaseDate: game.releaseDate,
      linkOrId: game.steamAppID,
      imgLink: game.thumb,
      rating: game.steamRatingPercent
    }

    API.Game.getAllByName(game.steamAppID)
      .then(function (response) {
        if (response.data.length === 0) { //if Game is not already in games DB we will add it before creating a wishlistItem.
          API.Game.create(
            newGameInfo
          ).then(function (gameData) {
            API.Wishlist.getAllByUserId(props.user.id).then(function (wishlistData) { //get user's wishlist
              if ((parseFloat(wishlistData.data[0].totalCost) + parseFloat(game.normalPrice)) <= parseFloat(wishlistData.data[0].budget)) { //adding new wishlistItem must not exceed budget
                API.WishlistItem.create(
                  {
                    purchaseDate: Date.now(),
                    GameId: gameData.data.id, //gameId taken from newly added game
                    WishlistId: wishlistData.data[0].id
                  }
                ).then(() => {
                  updateTotalCost(wishlistData.data[0].id, parseFloat(wishlistData.data[0].totalCost), parseFloat(game.normalPrice)) //update totalCost in wishlist model
                  wishlistItemSuccess(game.title) //success message
                });
              }
              else { //if adding new wishlistItem would cause user to go over budget, wishlistItemFailure is called
                wishlistItemFailure(game.title) //failure message
              }
            })
          });
        }
        else { //if game is already in games DB we go straight to adding game as a wishlistItem associated with user's wishlist.
          API.Wishlist.getAllByUserId(props.user.id).then(function (wishlistData) {
            if ((parseFloat(wishlistData.data[0].totalCost) + parseFloat(game.normalPrice)) <= parseFloat(wishlistData.data[0].budget)) { //check to make sure budget wouldn't be exceeded
              API.WishlistItem.create(
                {
                  purchaseDate: Date.now(),
                  GameId: response.data[0].id, //gameId taken from existing game in gamesDB
                  WishlistId: wishlistData.data[0].id
                }
              ).then(() => {
                updateTotalCost(wishlistData.data[0].id, parseFloat(wishlistData.data[0].totalCost), parseFloat(game.normalPrice))
                wishlistItemSuccess(game.title) //success message
              })
            }
            else {
              wishlistItemFailure(game.title) //failure message
            }
          })
        }
      })
  }

  function updateTotalCost(wishlistId, currentTotalCost, gamePrice) {
    API.Wishlist.update(wishlistId, {totalCost: currentTotalCost + gamePrice})
  }

  function wishlistItemSuccess(title) {
    props.setReload(true)
    Swal.fire({
      title: `You have added ${title} to your wishlist.`,
      width: 600,
      confirmButtonText: 'Aye!',
      confirmButtonColor: '#C46000',
      padding: '3em'
    })
  }

  function wishlistItemFailure(title) {
    Swal.fire({
      title: `You cannot add ${title} until you increase your budget or remove games from your wishlist.`,
      width: 600,
      confirmButtonText: 'Aghh!',
      confirmButtonColor: '#C46000',
      padding: '3em'
    })
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

  return (
    <>
      <h1 style={{textAlign: "center"}}>Search Games</h1>
      <div id="searchInputContainer">
        <form className={classes.root} noValidate autoComplete="off" id="gameSearchForm">
          <TextField type="text" id="searchInput" label="Search" onChange={handleInputChange} />
          <Button variant="contained" id="getGame" onClick={getGame}>Submit</Button>
          <Button variant="contained" id="clearSearch" onClick={() => setGameResults([])}>Clear Search</Button>
        </form>
      </div>
      {gameResults.length > 0 &&
      <TableContainer id="resultsTable" component={Paper}>
        <Table className={classes.table} style={{margin: "auto"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell id="tableHeader" key="cell1" align="left">Game</TableCell>
              <TableCell id="tableHeader" key="cell2" align="left">Price</TableCell>
              <TableCell id="tableHeader" key="cell3" align="left">Rating</TableCell>
              <TableCell id="tableHeader" key="cell4" align="left">Release Date</TableCell>
              <TableCell id="tableHeader" key="cell5" align="left">Add to Wishlist</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {
                gameResults.map((game) => (
                  <TableRow key={(Math.random() * Math.floor(10000))}>
                    <TableCell component="th" scope="row" align="left">
                      <img src={game.thumb} alt={game.title}></img>
                    </TableCell>
                    <TableCell id="tableCell" key="title" align="left">{game.title}</TableCell>
                    <TableCell id="tableCell" key="price" align="left">{game.normalPrice}</TableCell>
                    <TableCell id="tableCell" key="percent" align="left">{game.steamRatingPercent}%</TableCell>
                    <TableCell id="tableCell" key="release-date" align="left">{timeConverter(game.releaseDate).substring(0, 11)}</TableCell>
                    <TableCell id="tableCell" key="post-game"   align="left">
                      <Button id="addBtn" variant="contained" onClick={() => getWishlistStatus(game)}>Add</Button>
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

