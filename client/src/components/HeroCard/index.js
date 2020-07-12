import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Link, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import img from './logo.png';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles({
    root: {
        borderRadius: "borderRadius",
        backgroundColor: 'white',
        textAlign: 'center',
        maxWidth: 768,
        minWidth: 320,
        marginBottom: '10%',
    },
});

export const HeroCard = React.memo(function HeroCard() {
    const styles = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container className={styles.root}>
                <Box className={styles.root}>

                    <CardMedia
                        width={'100%'}
                        component="img"
                        image={img}
                    />

                    <Grid container className={styles.root}>
                        <Grid container item xs={12} className={styles.root}>
                            <Grid item xs></Grid>
                            <Grid item xs={8}>
                                <Button color="primary" variant="contained" component={Link} to="/login">
                                    Login
                                        </Button>&nbsp;&nbsp;&nbsp;
                                        <Button color="primary" variant="contained" component={Link} to="/signup">
                                    Signup
                                        </Button>
                            </Grid>
                            <Grid item xs></Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
});