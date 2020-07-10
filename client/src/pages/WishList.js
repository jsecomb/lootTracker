import React, {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GameTable from "../components/GameTable";
import AddGame from "../components/AddGame";
import AddWishlist from "../components/AddWishlist";
//import { MuiThemeProvider } from '@material-ui/core/styles';
//import theme from "./utils/theme";


function WishList(props) {
    
    const [reload, setReload] = useState(false);

    return (
        <>
            <Paper>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            <AddGame user={props.user} setReload={setReload}/>
                            <GameTable user={props.user} reload={reload} setReload={setReload}/>
                            <AddWishlist/>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </>
    )
}

export default WishList;