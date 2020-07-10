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
//import { MuiThemeProvider } from '@material-ui/core/styles';
//import theme from "../../utils/theme"

export default function AddGame(props) {

  const [gameString, setGameString] = useState("");
  const [gameResults, setGameResults] = useState([]);

  const useStyles = makeStyles({
    table: {
      minWidth: 500,
      maxWidth: 800,
      backgroundColor: "#164968"
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
        let gamesList = response.data.sort(function(a,b){return a.steamAppID - b.steamAppID});
        let filteredGamesList = [];
        let steamIds = []
        for(let i=0; i<gamesList.length-1; i++){
          if (!steamIds.includes(gamesList[i].steamAppID)){
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

  function postGame(game) {
    setGameResults([]);
    console.log(`you are adding ${game.title}`)
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
      if(response.data.length === 0){
        API.Game.create(
          newGameInfo
        ).then(function (gameData) {
          API.Wishlist.getAllByUserId(props.user.id).then(function (wishlistData) {
            API.WishlistItem.create(
              {purchaseDate: Date.now(),
              GameId: gameData.data.id,
              WishlistId: wishlistData.data[0].id}
              ).then(function (response) {
              props.setReload(true)
              alert("you have added a game to your wishlist")
            });
          })  
          alert("you have added a game to the game db")
        });
      }
      else {
        API.Wishlist.getAllByUserId(props.user.id).then(function (wishlistData) {
          API.WishlistItem.create(
            {purchaseDate: Date.now(),
            GameId: response.data[0].id,
            WishlistId: wishlistData.data[0].id}
            ).then(function (response) {
            props.setReload(true)
            alert("you have added a game to your wishlist")
          });
        })  
      }
    })
  }

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off" id="searchForm">
        <TextField type="text" id="searchInput" label="Search Games" onChange={handleInputChange}/>
        <Button variant="contained" id="getGame" onClick={getGame}>Submit</Button>
        <Button variant="contained" id="clearSearch" onClick={() => setGameResults([])}>Clear Search</Button>
      </form>
      <TableContainer id="resultsTable" component={Paper}>
        {gameResults.length > 0 &&
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell id="tableHeader" align="left">Game</TableCell>
              <TableCell id="tableHeader" align="left">Price</TableCell>
              <TableCell id="tableHeader" align="left">Rating</TableCell>
              <TableCell id="tableHeader" align="left">Release Date</TableCell>
              <TableCell id="tableHeader" align="left">Add to Wishlist</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {
                gameResults.map((game) => (
                  <TableRow key={game.name}>
                    <TableCell component="th" scope="row" align="left">
                      <img src={game.thumb}></img>
                    </TableCell>
                    <TableCell id="tableCell" align="left">{game.title}</TableCell>
                    <TableCell id="tableCell" align="left">{game.steamRatingPercent}%</TableCell>
                    <TableCell id="tableCell" align="left">{game.normalPrice}</TableCell>
                    <TableCell id="tableCell" align="left">{timeConverter(game.releaseDate).substring(0, 11)}</TableCell>
                    <TableCell id="tableCell" align="left">
                      <Button id="addBtn" variant="contained" onClick={() => postGame(game)}>Add</Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
        </Table>
        }
      </TableContainer>
    </>

  );
}

