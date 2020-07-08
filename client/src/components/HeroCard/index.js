import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { sizing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Link, Container } from '@material-ui/core';
import img from './Logo-940.png';

const useStyles = makeStyles(() => ({
    root: {
        margin: 'auto',
        borderRadius: 0,
        position: 'relative',
    },
    content: {
        padding: 0,
    },
    cta: {
        display: 'inline',
        textAlign: 'center',
        color: '#DB991C',
        letterSpacing: '3px',
        fontWeight: 200,
        fontSize: 12,
    },
    title: {
        color: '#fff',
        letterSpacing: '2px',
    },
}));

export const HeroCard = React.memo(function HeroCard() {
    const styles = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth=""></Container>
            <Container className={styles.root} maxWidth="lg">
                <Box position={'relative'} width={'100%'} height={'100%'} p={2}>
                    <CardMedia
                        width={'100%'}
                        component="img"
                        image={img}
                    />
                </Box>

                <Grid className={styles.cta} variant={'overline'}>
                    <Button variant="contained" component={Link} to="/login" color="#DB991C" item xs={3}>
                        Login
                </Button>
                    <Button variant="contained" component={Link} to="/signup" color="#DB991C" item xs={3}>
                        Signup
                </Button>
                </Grid>
            </Container>
        </React.Fragment>
    );
});

export default HeroCard;