import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, CardMedia, Box } from '@material-ui/core';
import BeneCard from "../BeneCard";
import logo from '../../assets/logo.png';


const useStyles = makeStyles(theme => ({

    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: 'center',
        itemAlign: 'center',
        alignContent: 'center',
        marginBottom: '3%',
        margin: 'auto',
        borderRadius: '2px',
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100%)',
        },
        [theme.breakpoints.up('md')]: {
            height: 'calc(100% - 50px)'
        }
    },
}));

export const HeroCard = React.memo(function HeroCard() {
    const classes = useStyles();
    return (
        <>
            <Grid container item>
                <Grid item xs={12} md={10} lg={8} xl={12} style={{ margin: 'auto' }}>
                    <CardMedia
                        component="img"
                        image={logo}
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
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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