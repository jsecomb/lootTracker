import React from 'react';
import "./style.css";
import { useState } from 'react';
import axios from 'axios'
import API from "../../utils/API"
//import { MuiThemeProvider } from '@material-ui/core/styles';
//import theme from "../../utils/theme"

export default function AddGame(props) {

  const [gameString, setGameString] = useState("");
  const [gameResults, setGameResults] = useState([]);

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

    // axios({
    //   "method": "GET",
    //   "url": "https://cheapshark-game-deals.p.rapidapi.com/games",
    //   "headers": {
    //     "content-type": "application/octet-stream",
    //     "x-rapidapi-host": "cheapshark-game-deals.p.rapidapi.com",
    //     "x-rapidapi-key": "bd4f506c00msh4e1a6d977943236p19a6b1jsn647b911e2981",
    //     "useQueryString": true
    //   }, "params": {
    //     "limit": "60",
    //     "title": gameString,
    //     "exact": "0"
    //   }
    // })

      .then((response) => {
        let gamesList = response.data.sort(function(a,b){return a.steamAppID - b.steamAppID});
        let filteredGamesList = [];
        for(let i=0; i<gamesList.length-1; i++){
          if (gamesList[i].steamAppID !== gamesList[i+1].steamAppID){
              filteredGamesList.push(gamesList[i])
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
      <h2>Search Games</h2>
      <div>
        <input type="text" onChange={handleInputChange}></input>
        <button id="getGame" onClick={getGame}>Submit</button>
      </div>
      <br/>
      <div>
        {gameResults.length>0 &&
        <table id="results">
          {gameResults.map(game => (<tr>
            <td><img src={game.thumb}></img></td>
            <td>{game.title}</td>
            <td>Rating: {game.steamRatingPercent}%</td>
            <td>Price: {game.normalPrice}</td>
            <td>{timeConverter(game.releaseDate).substring(0,11)}</td>
            <td><button id="addGame" onClick={() => postGame(game)}>Add to wishlist</button></td>
          </tr>
          ))}
        </table>
        }
        
      </div>
    </>

  );
}

