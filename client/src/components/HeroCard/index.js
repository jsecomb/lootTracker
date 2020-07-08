import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import CssBaseline from '@material-ui/core/CssBaseline';
import { sizing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Link, Container, Paper } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "../../utils/theme";
import img from './Logo-940.png';

const useStyles = makeStyles(() => ({
    root: {
        margin: 'auto',
        padding: 0,
        borderRadius: 0,
        position: 'relative',
    },
    content: {
        padding: 0,
    },
    cta: {
        display: 'inline',
        alignItems: 'center',
        padding: '5px',
        textAlign: 'center',
        letterSpacing: '3px',
        fontWeight: 200,
        fontSize: 12,
        width: '100%',
    },
}));

export const HeroCard = React.memo(function HeroCard() {
    const styles = useStyles();
    return (
        <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <Paper>
                    <Container className={styles.root} maxWidth="lg">
                        <Box position={'relative'} width={'100%'} height={'100%'} p={2}>
                            <CardMedia
                                width={'100%'}
                                component="img"
                                image={img}
                            />
            
                                <Grid container classname={styles.cta} spacing={3}>
                                    <Grid item xs>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" component={Link} to="/login">
                                            Login
                                        </Button>
                                        <Button variant="contained" component={Link} to="/signup">
                                            Signup
                                        </Button>
                                    </Grid>
                                    <Grid item xs>
                                    </Grid>
                                </Grid>
                        </Box>
                    </Container>
                </Paper>
            </MuiThemeProvider>
        </React.Fragment>
    );
});

export default HeroCard;