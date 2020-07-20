import React from 'react';
import { Container, Grid, Typography, Card, CardActions, CardMedia } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.png';
import theadshot from '../../assets/t-headshot.jpg';

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: "row",
        margin: '10px auto',
        padding: '10px',
    },
    cover: {
        width: '195px',
        height: '180px',
        padding: '10px 20px',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        margin: 'auto',
    },
    title: {
        padding: '10px 20px 0px 20px',
        margin: 'auto',
    },
    subtitle: {
        padding: '10px 20px',
        margin: 'auto',
    },
    links: {
        color: "#fff",
        margin: 'auto',
    }
});

const AboutCard = withStyles(styles)(({ classes }) => {

    return (
        <>
            <Container style={{ textAlign: 'center', margin: 'auto' }}>
                <h1>The LootTracker Team</h1>
                <Grid container item xs component={Card} style={{ marginTop: '21px' }} className={classes.root}>
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            className={classes.cover}
                            image="https://avatars3.githubusercontent.com/u/57421144?v=4"
                            title="Aaron Smith"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.title}>
                        <Typography gutterBottom variant="h5" component="h2" className="classes.title">
                            Aaron Smith
                                </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className="classes.subtitle">
                            Aaron Smith is Tucson-based web developer studying at the University of Arizona's Coding Bootcamp.
                                </Typography>
                        <CardActions>
                            <a href="https://github.com/SaskuatchofAZ" className={classes.links}>Aaron Smith's Github</a>
                            <a href="https://amazing-wozniak-96163c.netlify.app/" className={classes.links}>Aaron Smith's Portfolio</a>
                        </CardActions>
                    </Grid>
                </Grid>

                <Grid container item xs component={Card} style={{ marginTop: '21px' }} className={classes.root}>
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            className={classes.cover}
                            image="https://avatars3.githubusercontent.com/u/59972103?v=4"
                            title="Julian Secomb"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.title}>
                        <Typography gutterBottom variant="h5" component="h2" className="classes.title">
                            Julian Secomb
                                </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className="classes.subtitle">
                            Tucson native enrolled in the University of Arizona's Full Stack Web Development Program. Background in economics, design and fabrication.
                                </Typography>
                        <CardActions>
                            <a href="https://github.com/jsecomb" className={classes.links}>Julian Secomb's Github</a>
                            <a href=" https://trusting-chandrasekhar-ad2d90.netlify.app/" className={classes.links}>Julian Secomb's Portfolio</a>
                        </CardActions>
                    </Grid>
                </Grid>

                <Grid container xs item component={Card} style={{ marginTop: '21px' }} className={classes.root}>
                    <Grid item xs={12} sm={12} md={6}>
                        <CardMedia
                            className={classes.cover}
                            image={theadshot}
                            title="Teresa Bruggeman"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} className={classes.title}>
                        <Typography gutterBottom variant="h5" component="h2" className="classes.title">
                            Teresa Bruggeman
                                </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className="classes.subtitle">
                            Neophyte Full Stack Web Developer with an advanced degree in Computer Information Systems, background includes UX/UI and software installation/customization.
                                </Typography>
                        <CardActions className={classes.links}>
                            <a href="https://github.com/bruggineer" className={classes.links}>Teresa Bruggeman's Github</a>
                            <a href="https://bruggineer.github.io/Portfolio" className={classes.links}>Teresa Bruggeman's Portfolio</a>
                        </CardActions>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
});

export default AboutCard;