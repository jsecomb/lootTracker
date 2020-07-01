import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "./style.css";
import {useState} from 'react';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function AddGame() {

    const [gameString, setGameString] = useState("")

    function handleInputChange(event){
        setGameString(event.target.value)
    }

    function getGame() {

        axios({
            "method":"GET",
            "url":"https://cheapshark-game-deals.p.rapidapi.com/games",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"cheapshark-game-deals.p.rapidapi.com",
            "x-rapidapi-key":"bd4f506c00msh4e1a6d977943236p19a6b1jsn647b911e2981",
            "useQueryString":true
            },"params":{
            "limit":"60",
            "title":"batman",
            "exact":"0"
            }
            })
            .then((response)=>{
              console.log(response)
            })
            .catch((error)=>{
              console.log(error)
            })
    }
    
    const classes = useStyles();

    return (
        <>
            <div>
                <input type="text" onChange={handleInputChange}></input>
                <button id="getGame" onClick={getGame}>Submit</button>
            </div>
        </>

    );
}

