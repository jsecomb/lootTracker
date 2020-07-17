import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GameTable from "../components/GameTable";
import BudgetStats from "../components/BudgetStats";
import AddGame from "../components/AddGame";
import AddWishlist from "../components/AddWishlist";
import { spacing } from '@material-ui/system';

function WishList(props) {

    const [reload, setReload] = useState(false);

    const useStyles = makeStyles({
        root: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: "row",
            borderTop: 1,
            marginTop: '24px',
            // marginBottom: '25px',
        },
        paper: {
            marginBottom: '25px',
        }
    });

    const classes = useStyles()

    if (props.user) {

        return (
            <>
                <Grid container alignItems="stretch" className={classes.root} spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <BudgetStats user={props.user} reload={reload} setReload={setReload} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <AddWishlist user={props.user} setReload={setReload} />
                        </Paper>
                    </Grid>
                </Grid>
                <Paper style={{ marginBottom: "24px" }}>
                    <AddGame user={props.user} setReload={setReload} />
                </Paper>
                <Paper style={{ marginBottom: "24px" }}>
                    <GameTable user={props.user} reload={reload} setReload={setReload} />
                </Paper>
            </>
        )
    } else {
        <div>Loading...</div>
    }
}
    export default WishList;