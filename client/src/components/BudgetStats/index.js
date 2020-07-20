import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import "./style.css";
import { useState, useEffect } from 'react';
import API from "../../utils/API";

export default function AddWishlist(props) {

  const [currentBudget, setCurrentBudget] = useState(0)
  const [currentSpend, setCurrentSpend] = useState(0)

  useEffect(() => {
    getBudgetStats();
  }, [])

  function getBudgetStats() {
    API.Wishlist.getAllByUserId(props.user.id).then(res => {
      if (res.data) {
        setCurrentBudget(res.data[0].budget)
        setCurrentSpend(res.data[0].totalCost)
      }
    })
  }

  useEffect(() => {
    getBudgetStats();
    props.setReload(false);
  }, [props.reload])

  const useStyles = makeStyles({
    root: {
      height: '100%'
    },
    table: {
      padding: '21px',
    },
  });

  const classes = useStyles()

  return (
    <TableContainer className={classes.root} id="gameTable" component={Paper} spacing={3}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell id="bud-head" align="center">Total</TableCell>
            <TableCell id="bud-head" align="center">Spent</TableCell>
            <TableCell id="bud-head" align="center">Remaining</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell id="bud-stats" align="center">${currentBudget}</TableCell>
            <TableCell id="bud-stats" align="center" style={{ color: "red" }}>${currentSpend}</TableCell>
            <TableCell id="bud-stats" align="center" style={{ color: "green" }}>${parseInt(currentBudget) - parseInt(currentSpend)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}