import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import API from "../utils/API"
import { makeStyles } from '@material-ui/core/styles';

export default function ExtensionPage(props) {

  const user = JSON.parse(window.localStorage.getItem('user'));

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
    let user = JSON.parse(window.localStorage.getItem('user'));
    API.User.getById(user.id).then(function (userData) {
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
            console.log(gameData);
            API.Wishlist.getAllByUserId(user.id).then(function (wishlistData) {
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
          API.Wishlist.getAllByUserId(user.id).then(function (wishlistData) {
            console.log(props.user, user)
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
    console.log(urlArray[4]);
    let steamId = parseInt(urlArray[4]);
    getGame(steamId);
    
  }, [])
  
  return (
    <>
    </>
  );
}
