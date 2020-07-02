import React from 'react';
import "./style.css";
import { useState } from 'react';
import axios from 'axios'

export default function AddGame() {

  const [gameString, setGameString] = useState("");
  let searchResults = [];

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
        searchResults = response.data
        renderResults(searchResults);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function renderResults(searchResults) {
    searchResults.forEach(game => {
      let resultRow = document.createElement("tr");

      resultRow.innerHTML = 
      `<td><img src=${game.thumb}></img><td>
      <td>${game.title}<td>
      <td>SteamID: ${game.steamAppID}<td>
      <td>Rating: ${game.steamRatingPercent}%<td>
      <td>Price: ${game.normalPrice}<td>
      <td>${game.releaseDate}<td>
      <td><button id="addGame">Add to wishlist</button>`

      document.getElementById("results").append(resultRow)

      document.body.addEventListener('click', function (event) {
        if(event.target.id == 'addGame' ) {
          postGame(game)
        };
      });
    })
  }

  function postGame(game) {
    console.log(`you are adding ${game.title}`)
    let newGameInfo =
    {
      title: game.title,
      price: game.normalPrice,
      releaseDate: game.releaseDate,
      linkOrId: game.steamAppID
    }
    //POST ROUTE HERE
    // .then(function (response) {
    //   alert("you have added a game")
    // });
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
        <table id="results">
        </table>
      </div>
    </>

  );
}

