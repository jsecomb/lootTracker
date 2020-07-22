import React from 'react';
import "./style.css";
import { useState } from 'react';
import axios from 'axios'
import API from "../../utils/API"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
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

  const Swal = require('sweetalert2');

  function handleInputChange(event) {
    setGameString(event.target.value)
  }

  function onKeyDown(event) {
    if(event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      getGame();
    }
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
        document.getElementById('searchInput').value = '';
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
        if (response.data.length === 0) {
          API.Game.create(
            newGameInfo
          ).then(function (gameData) {
            API.Wishlist.getAllByUserId(props.user.id).then(function (wishlistData) {
              API.WishlistItem.create(
                {
                  GameId: gameData.data.id,
                  WishlistId: wishlistData.data[0].id
                }
              ).then(wishlistItemSuccess(game.title));
            })
          });
        }
        else {
          API.Wishlist.getAllByUserId(props.user.id).then(function (wishlistData) {
            API.WishlistItem.create(
              {
                GameId: response.data[0].id,
                WishlistId: wishlistData.data[0].id
              }
            ).then(wishlistItemSuccess(game.title));
          })
        }
      })
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

  const useStyles = makeStyles(theme => ({
    root: {
      textAlign: "center",
      marginTop: '0px',
      overflow: 'hidden',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 800,
      paddingTop: '21px',
    },
  })) ;

  const classes = useStyles()

  return (
    <>
    <Container className={classes.root}>
      <div className={classes.title}>Search Games</div>
      <Container className={classes.search} id="searchInputContainer" component="div" overflow="visible">
        <form noValidate autoComplete="off" id="gameSearchForm">
          <TextField type="text" id="searchInput" label="Search" onChange={handleInputChange} onKeyDown={onKeyDown} />
          <Button variant="contained" id="getGame" color='primary' onClick={getGame}>Submit</Button>
          <Button variant="contained" id="clearSearch" color='primary' onClick={() => setGameResults([])}>Clear Search</Button>
        </form>
      </Container>
      {gameResults.length > 0 &&
      <TableContainer id="resultsTable" component={Paper}>
        <Table className={classes.table} style={{margin: "auto"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell key="cell1" align="left">Game</TableCell>
              <TableCell key="cell2" align="left">Price</TableCell>
              <TableCell key="cell3" align="left">Rating</TableCell>
              <TableCell key="cell4" align="left">Release Date</TableCell>
              <TableCell key="cell5" align="left">Add to Wishlist</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {
                gameResults.map((game) => (
                  <TableRow key={(Math.random() * Math.floor(10000))}>
                    <TableCell component="th" scope="row" align="left">
                      <a href={`https://store.steampowered.com/app/${game.steamAppID}/`}><img src={game.thumb} alt={game.title}></img></a>
                    </TableCell>
                    <TableCell key="title" align="left">{game.title}</TableCell>
                    <TableCell key="price" align="left">{game.normalPrice}</TableCell>
                    <TableCell key="percent" align="left">{game.steamRatingPercent}%</TableCell>
                    <TableCell key="release-date" align="left">{timeConverter(game.releaseDate).substring(0, 11)}</TableCell>
                    <TableCell key="post-game" align="left">
                      <Button key="addBtn" variant="contained" color="primary" onClick={() => getWishlistStatus(game)}>Add</Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
        </Table>
      </TableContainer>
      }
      </Container>
    </>
  );
}

