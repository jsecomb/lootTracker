import React from 'react';
import { makeStyles, Container, Paper, Grid, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
})
function About() {
    const classes = useStyles();

    return (
        <Container>
            <Paper>
                <Grid xs="4">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://avatars3.githubusercontent.com/u/57421144?v=4"
                                title="Aaron Smith"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Aaron Smith
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Aaron Smith is Tucson-based web developer studying at the University of Arizona's Coding Bootcamp.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <a href="https://github.com/SaskuatchofAZ">Aaron Smith's Github</a>
                            <a href="https://amazing-wozniak-96163c.netlify.app/">Aaron Smith's Portfolio</a>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid xs="4">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://avatars3.githubusercontent.com/u/59972103?v=4"
                                title="Julian Secomb"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Julian Secomb
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Placeholder placeholder placeholder.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <a href="https://github.com/jsecomb">Julian Secomb's Github</a>
                            <a href="https://amazing-wozniak-96163c.netlify.app/">Aaron Smith's Portfolio</a>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid xs="4">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://avatars2.githubusercontent.com/u/59456435?v=4"
                                title="Teresa Bruggeman"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Teresa Bruggeman
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Placeholder placeholder placeholder.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <a href="https://github.com/bruggineer">Teresa Bruggeman's Github</a>
                            <a href="https://amazing-wozniak-96163c.netlify.app/">Teresa Bruggeman's Portfolio</a>
                        </CardActions>
                    </Card>

                </Grid>
            </Paper>
        </Container>
    )
}

export default About