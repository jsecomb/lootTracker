import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid, Button, Link, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import img from './logo.png';
import BeneCard from "../BeneCard";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        borderRadius: "borderRadius",        
        textAlign: 'center',
        itemAlign: 'center',
        minWidth: 0,
        marginBottom: '3%',
        margin: 'auto',
    },
})

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
                    <Box my={3}>
                    <BeneCard margin="auto"/>
                    </Box>

                    <Box p={3} className={styles.root}>
                        <Grid container item xs={12} className={styles.root}>
                            <Grid item xs></Grid>
                            <Grid item xs={8} >
                                <Button color="primary" variant="contained" component={Link} to='./login'>
                                    Login
                                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button color="primary" variant="contained" component={Link} to="./signup">
                                    Signup
                                        </Button>
                            </Grid>
                            <Grid item xs></Grid>
                        </Grid>
                    </Box>                         
                </Box>
            </Container>
        </React.Fragment>
    );
});