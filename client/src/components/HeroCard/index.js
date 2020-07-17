import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid, Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import img from './logo.png';
import BeneCard from "../BeneCard";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({

    root: {
        borderRadius: "borderRadius",
        textAlign: 'center',
        itemAlign: 'center',
        alignContent: 'center',
        marginBottom: '3%',
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100%)',
        },
        [theme.breakpoints.up('md')]: {
            height: 'calc(100% - 50px)'
        }
    },
    logo: {
        [theme.breakpoints.between('xs', 'sm')]: {
            maxWidth: '100%',
            margin: 'auto',
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: '60%',
            margin: 'auto',
        },
    },
}));

export const HeroCard = React.memo(function HeroCard() {
    const classes = useStyles();
    return (
        <>
            <Grid container item className={classes.root}>
                <Grid item xs className={classes.logo}>
                    <CardMedia
                        component="img"
                        image={img}
                    />
                </Grid>
                <Box className={classes.root}>
                    <BeneCard />
                </Box>
                <Grid container item className={classes.root}>
                    <Grid item xs className={classes.root}></Grid>
                    <Grid item xs={8} className={classes.root}>
                        <Button color="primary" variant="contained" component={Link} to='./login'>
                            Login
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button color="primary" variant="contained" component={Link} to="./signup">
                            Signup
                        </Button>
                    </Grid>
                    <Grid item xs className={classes.root}></Grid>
                </Grid>
            </Grid>
        </>
    );
});