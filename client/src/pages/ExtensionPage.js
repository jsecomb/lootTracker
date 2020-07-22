import React from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import API from "../utils/API"

export default function ExtensionPage(props) {

  const Swal = require('sweetalert2')

  function getGame(gameID) {

    axios({
      "method": "GET",
      "url": "https://www.cheapshark.com/api/1.0/deals",
      "params": {
        "limit": "10",
        "steamAppID": gameID
      }
    })
      .then((response) => {
        let gamesList = response.data.sort(function (a, b) { return a.steamAppID - b.steamAppID });
        getWishlistStatus(gamesList[0])
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
    Swal.fire({
      title: `You have added ${title} to your wishlist.`,
      width: 600,
      confirmButtonText: 'Aye!',
      confirmButtonColor: '#C46000',
      padding: '3em'
    }).then(() => window.location.assign("/wishlist"))
  }

  useEffect(() => {
    let urlString = window.location.href;
    const urlArray = urlString.split('/');
    let steamId = parseInt(urlArray[4]);
    getGame(steamId);
  }, [])
  
  return (
    <>
    </>
  );
}
