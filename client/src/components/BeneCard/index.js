import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, Container } from '@material-ui/core';
import img from './logo.png';

const styles = {
  root: {
    display: 'flex',
    maxWidth: '90%',
    minWidth: '0',
    opacity: '90%',
    flexGrow: 1,
    flexDirection: "row",
    margin: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
    justifyItems: 'center',
    alignContent: 'space-between',
  },
  cover: {
    width: 200,
    height: 200,
  },
};

export const BeneCard = withStyles(styles)(({ classes }) => {
  return (
    <Container className={classes.root}>
      <Grid container item className={classes.root}>

        <Grid item xs={12} sm={4} component={Card}>
          <CardContent className={classes.root}>
            <CardMedia
              className={classes.cover}
              image={img}
              title="loottracker"
            />
            <Typography component="h5" variant="h5">
              Track your budget
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              blahblahblah
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={12} sm={4} component={Card}>
          <CardContent className={classes.root}>
            <CardMedia
              className={classes.cover}
              image={img}
              title="loottracker"
            />
            <Typography component="h5" variant="h5">
              Track your budget
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" >
              blahblahblah
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={12} sm={4} component={Card}>
          <CardContent className={classes.root}>
            <CardMedia
              className={classes.cover}
              image={img}
              title="loottracker"
            />
            <Typography component="h5" variant="h5">
              Track your budget
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              blahblahblah
            </Typography>
          </CardContent>
        </Grid>
      </Grid >
    </Container>
  )
});

export default BeneCard;