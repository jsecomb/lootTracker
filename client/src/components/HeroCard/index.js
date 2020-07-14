import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid, Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from "./../../theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import img from './logo.png';
import BeneCard from "../BeneCard";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        borderRadius: "borderRadius",
        textAlign: 'center',
        itemAlign: 'center',
        alignContent: 'center',
        minWidth: 0,
        marginBottom: '3%',
        margin: 'auto',
    },
    logo: {
        [theme.breakpoints.up('laptop')]: {
            maxWidth: '75%',
            margin: 'auto',
        },
        [theme.breakpoints.up('desktop')]: {
            maxWidth: '75%',
            margin: 'auto',
        },
    }
})

export const HeroCard = React.memo(function HeroCard() {
    const styles = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <MuiThemeProvider theme={theme}>
                <Container className={styles.root}>
                    <Box className={styles.logo}>
                        <CardMedia
                            component="img"
                            image={img}
                        />
                    </Box>
                    <Box className={styles.root}>
                        <BeneCard />
                    </Box>
                    <Box p={3} className={styles.root}>
                        <Grid container item xs={12} className={styles.root}>
                            <Grid item xs className={styles.root}></Grid>
                            <Grid item xs={8} className={styles.root}>
                                <Button color="primary" variant="contained" component={Link} to='./login'>
                                    Login
                                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button color="primary" variant="contained" component={Link} to="./signup">
                                    Signup
                                        </Button>
                            </Grid>
                            <Grid item xs className={styles.root}></Grid>
                        </Grid>
                    </Box>
                </Container>
            </MuiThemeProvider>
        </React.Fragment>
    );
});