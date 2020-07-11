import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Link, Container } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "../../theme"
import img from './logo.png';



const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        backgroundColor: 'white',
    },
    cta1: {
        //alignItems: 'center',
        textAlign: 'center',
        // letterSpacing: '3px',
        // fontWeight: 200,
        // fontSize: 12,
    },
}));

export const HeroCard = React.memo(function HeroCard() {
    const styles = useStyles();
    return (
        <React.Fragment>
            <MuiThemeProvider theme={theme}>                
                    <Container disableGutters={true} className={styles.root} padding-left={0} padding-right={0}>
                        <Box position={'relative'} width={'100%'} height={'100%'}>
                            <CardMedia
                                width={'100%'}
                                component="img"
                                image={img}
                            />
                        </Box>
                        <div className={styles.root}>
                            <Grid container spacing={8}>
                                <Grid container item xs={12} spacing={3} className={styles.cta1} >
                                    <Grid item xs></Grid>
                                    <Grid item xs={8}>
                                        <Button color="secondary" variant="contained" component={Link} to="./login">
                                            Login
                                        </Button>&nbsp;&nbsp;&nbsp;
                                        <Button color="secondary" variant="contained" component={Link} to="./signup">
                                            Signup
                                        </Button>
                                    </Grid>
                                    <Grid item xs></Grid>
                                </Grid>
                            </Grid>        
                            </div>
                    </Container>                
            </MuiThemeProvider>
        </React.Fragment>
    );
});