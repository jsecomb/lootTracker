import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, Typography } from '@material-ui/core';
import { Grid, Container } from '@material-ui/core';
import img1 from '../../assets/piechart1.png';
import img2 from '../../assets/linechart1.png';
import card3 from '../../assets/extensionbutton.png';
const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: "row",
    margin: '10px auto',
    padding: '10px',
  },
  cover: {
    width: '100%',
    height: 'auto',
    padding: '10px 20px',
    borderRadius: '2px',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    padding: '10px 20px 0px 20px',
    margin: 'auto',
  },
  subtitle: {
    padding: '10px 20px',
  },
});

export const BeneCard = withStyles(styles)(({ classes }) => {
  return (
    <>
      <Container style={{ textAlign: 'center' }}>
        <Grid container item xs component={Card} style={{ marginTop: '21px' }} className={classes.root}>
          <Grid item xs={12} sm={12} md={6}>
            <CardMedia border={1}
              className={classes.cover}
              component='img'
              image={"https://i.imgur.com/MaeFwm6.png?5"}
              title="wishlist"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.title}>
            <Typography component="h5" variant="h5" className={classes.title}>Plan your Game Purchases
              </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Serious gamers know it's easy to overspend on games. LootTracker's WishList helps gamers plan their spending wisely.
              </Typography>
          </Grid>
        </Grid>

        <Grid container item xs component={Card} style={{ marginTop: '21px' }} className={classes.root}>
          <Grid item xs={12} md={3}>
            <CardMedia
              component='img'
              image={img1}
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.title}>
            <Typography component="h5" variant="h5" className={classes.title}>Track your Spending
              </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              LootTracker helps you stick to your gaming budget with graphics that track your spending.
              </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <CardMedia
              component='img'
              image={img2}
            />
          </Grid>
        </Grid>

        <Grid container xs item component={Card} style={{ marginTop: '21px' }} className={classes.root}>
          <Grid item xs={12} sm={12} md={6}>
            <CardMedia
              className={classes.cover}
              component='img'
              image={card3}
              title="extension"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.title}>
            <Typography component="h5" variant="h5" className={classes.title}>Find your Games with Steam Integration
              </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              LootTrackers' browser extension for Steam lets you choose games for your WishList directly from their app.
              </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
});

export default BeneCard;