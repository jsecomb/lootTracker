import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./style.css";

export default function BudgetProgressBar(props) {

    console.log(props.remaining)
return(
    <ProgressBar id="progressBar" now={props.remaining} label={`${props.remaining}% Remaining`}/>
) 

}