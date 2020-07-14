import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import "./style.css";
import { useState, useEffect } from 'react';
import API from "../../utils/API";

export default function AddWishlist(props) {

    const [currentBudget, setCurrentBudget] = useState(0)
    const [currentSpend, setCurrentSpend] = useState(0)

    const useStyles = makeStyles({
        table: {
          minWidth: 500,
          maxWidth: 800,
          backgroundColor: "#424242"
        }
    });
    
    const classes = useStyles()

    useEffect(()=> {
      getBudgetStats()
    },[])

    function getBudgetStats() {
      API.Wishlist.getAllByUserId(props.user.id).then(res => {
        if (res.data) {
          setCurrentBudget(res.data[0].budget)
          setCurrentSpend(res.data[0].totalCost)
        }
      })
    }

    return (
    <TableContainer id="gameTable" component={Paper}>
      <Table className={classes.table} style={{margin: "auto"}} aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell id="tableHeader" align="center">Total Budget</TableCell>
              <TableCell id="tableHeader" align="center">Budget Spent</TableCell>
              <TableCell id="tableHeader" align="center">Budget Remaining</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell id="tableCell" align="center">${currentBudget}</TableCell>
                <TableCell id="tableCell" align="center" style={{color: "red"}}>${currentSpend}</TableCell>
                <TableCell id="tableCell" align="center" style={{color: "green"}}>${parseInt(currentBudget)-parseInt(currentSpend)}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>  
    )
}