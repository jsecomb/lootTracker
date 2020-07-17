import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, Container } from '@material-ui/core';
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
      <Grid container xs={12} className={classes.root}>

        <Grid item xs component={Card}>
          <CardContent className={classes.root}>
            <CardMedia
              className={classes.cover}
              component='img'
              image={img}
              title="loottracker"
            />
            <Typography component="h5" variant="h5">
              Track your budget
            </Typography>
            <Typography variant="subtitle1">
              blahblahblah
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs component={Card}>
          <CardContent className={classes.root}>
            <CardMedia
              className={classes.cover}
              component='img'
              image={img}
              title="loottracker"
            />
            <Typography component="h5" variant="h5">
              Track your budget
            </Typography>
            <Typography variant="subtitle1">
              blahblahblah
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs component={Card}>
          <CardContent className={classes.root}>
            <CardMedia
              className={classes.cover}
              component='img'
              image={img}
              title="loottracker"
            />
            <Typography component="h5" variant="h5">
              Track your budget
            </Typography>
            <Typography variant="subtitle1">
              blahblahblah
            </Typography>
          </CardContent>
        </Grid>
      </Grid >
      </>
  )
});

export default BeneCard;