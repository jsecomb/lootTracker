import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { sizing, position, borderRadius, spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Container, Paper } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import img from './Logo-940.png';

const useStyles = makeStyles({
    root: {
        borderRadius: "borderRadius",
        textAlign: 'center',
        // minHeight: "66%",
        maxWidth: 768,
        minWidth: 320,
        marginBottom: '10%',
        MuiGrid: {
            'spacing-xs-3': {
              '& > $item': {
                padding: 0,
              },
            },
          },
    },
});

export const HeroCard = React.memo(function HeroCard() {
    const styles = useStyles();
    return (
        <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <Container className={styles.root}>                    
                        <Box position={'relative'} width={'100%'} height={'100%'}>
                            <CardMedia
                                width={'100%'}
                                component="img"
                                image={img}
                            />
                        </Box>
                        {/* <div className={styles.root}> */}
                            <Grid container spacing={8} className={styles.root}>
                                <Grid container item xs={12}  className={styles.root}>
                                    <Grid item xs></Grid>
                                    <Grid item xs={8}>
                                        <Button color="secondary" variant="contained" component={Link} to="/login">
                                            Login
                                        </Button>&nbsp;&nbsp;&nbsp;
                                        <Button color="secondary" variant="contained" component={Link} to="/signup">
                                            Signup
                                        </Button>
                                    </Grid>
                                    <Grid item xs></Grid>
                                </Grid>
                            </Grid>
                        {/* </div> */}
                    
                </Container>
            </MuiThemeProvider>
        </React.Fragment>
    );
});

export default HeroCard;