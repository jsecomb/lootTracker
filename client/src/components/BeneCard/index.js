import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import img from './logo.png';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: "row",
    margin: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
    justifyItems: 'center',
    alignContent: 'space-between',
    backgroundColor: 'primary'
  },
  cover: {
    width: '27%',
    height: '27%',
  },
  
});

export const BeneCard = withStyles(styles)(({ classes }) => {
  return (
    <>
      <Grid className={classes.root}>
        <Grid item xs component={Card} style={{marginTop: '21px'}}>
          <CardContent className={classes.root}>
            <Grid item xs={12} sm={6}>
            <CardMedia
              className={classes.cover}
              component='img'
              image={"https://i.imgur.com/MaeFwm6.png?5"}
              title="wishlist"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <h1>Plan your Game Purchases</h1>
            <Typography variant="subtitle1">
              Serious gamers know that it's easy to overspend on games. LootTracker helps gamers plan their game spending wisely.
            </Typography>
            </Grid>
          </CardContent>
        </Grid>
      </Grid >
      <Grid container xs={12} className={classes.root} style={{marginTop: '21px'}}>
        <Grid item xs component={Card}>
          <CardContent className={classes.root}>
            <CardMedia
              className={classes.cover}
              component='img'
              image={"https://i.imgur.com/buo01Ee.png?1"}
              title="stats"
            />
            <Typography component="h5" variant="h5">
              Track your Spending
            </Typography>
            <Typography variant="subtitle1">
              LootTracker lets you set a gaming budget and helps you stick to it, with stats and tables that track your spending over time.
            </Typography>
          </CardContent>
        </Grid>
      </Grid >
      <Grid container xs={12} className={classes.root} style={{marginTop: '21px'}}>
        <Grid item xs component={Card}>
          <CardContent className={classes.root}>
            <CardMedia
              className={classes.cover}
              component='img'
              image={"https://i.imgur.com/y8KmYvk.png?1"}
              title="extension"
            />
            <Typography component="h5" variant="h5">
              Steam Integration
            </Typography>
            <Typography variant="subtitle1">
              Use our search feature or our Steam browser extension to add games to your wishlist.
            </Typography>
          </CardContent>
        </Grid>
      </Grid >
      </>
  )
});

export default BeneCard;