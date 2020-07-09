import React, {useState} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GameTable from "../components/GameTable";
import BudgetProgressBar from "../components/BudgetProgressBar";
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