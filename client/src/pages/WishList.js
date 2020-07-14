import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GameTable from "../components/GameTable";
import BudgetStats from "../components/BudgetStats";
import AddGame from "../components/AddGame";
import AddWishlist from "../components/AddWishlist";
//import { MuiThemeProvider } from '@material-ui/core/styles';
//import theme from "./utils/theme";


function WishList(props) {
    
    const [reload, setReload] = useState(false);

    const useStyles = makeStyles({
        table: {
          minWidth: 500,
          maxWidth: 800,
          backgroundColor: "#424242"
        }
      });
    
    const classes = useStyles()

    return (
        <> 
            <Grid container spacing={6} style={{marginBottom: "25px"}}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <BudgetStats user={props.user} reload={reload} setReload={setReload}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <AddWishlist user={props.user} setReload={setReload}/>
                    </Paper>
                </Grid>
            </Grid>
            <Paper style={{marginBottom: "50px"}}>
                <AddGame user={props.user} setReload={setReload}/>
            </Paper>
            <Paper style={{marginBottom: "25px"}}>
                <GameTable user={props.user} reload={reload} setReload={setReload}/>    
            </Paper>
        </>
    )
}

export default WishList;