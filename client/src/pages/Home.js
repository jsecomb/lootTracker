import React from "react";
import { Container, Paper, Typography, Grid } from "@material-ui/core";

function Home() {

    return (
        <>
            <Paper>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>

                            <Typography variant="h2" align="center" gutterBottom>
                                LootTracker                    
                            </Typography>
                            <Typography variat= "h3" align='center gutterBottom>
                            Use a Wish List and a budget amount to optimize your gaming dollars.
                            </Typography>
                        </Grid>
                    </Grid>
                
            </Container>
            </Paper>
        </>
    )
}

export default Home;