import React from "react";
import { Button, TextField, Container, Grid, Paper, Typography } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

function SignupForm(props) {
    const { formObject, handleFormSubmit, handleInputChange } = props;

    return (
        <>
            <MuiThemeProvider theme={theme}>
                <Paper>
                    <Container maxWidth="sm">
                        <form>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" gutterBottom>
                                        Signup
                                </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Email"
                                        value={formObject.email}
                                        name="email"
                                        onChange={handleInputChange}
                                        as="input"
                                        type="email"
                                        placeholder="Enter your Email"
                                        helperText="This will be public!"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Password"
                                        value={formObject.password}
                                        name="password"
                                        onChange={handleInputChange}
                                        as="input"
                                        type="password"
                                        placeholder="Enter your password"
                                        helperText="This will be your password (we won't share it with anyone!)"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" onClick={handleFormSubmit}>
                                        Signup
                                </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Paper>
            </MuiThemeProvider>
        </>
    )
}

export default SignupForm;