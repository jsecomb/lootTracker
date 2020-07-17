import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core/';
import GameTable from "../components/GameTable";
import BudgetStats from "../components/BudgetStats";
import AddGame from "../components/AddGame";
import AddWishlist from "../components/AddWishlist";

function WishList(props) {

    const [reload, setReload] = useState(false);

    const useStyles = makeStyles({
        root: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: "row",
            borderTop: 1,
            marginTop: '24px',
        },
    });

    const classes = useStyles()

    if (props.user) {

        return (
            <>
                <Grid container direction='row' alignContent="space-between" justify='space-between' className={classes.root} style={{paddingTpo:'0px', marginTop: '12px'}} >
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.root} style={{ height: '145px' }}>
                            <BudgetStats user={props.user} reload={reload} setReload={setReload} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.root} style={{ height: '145px' }}>
                            <AddWishlist user={props.user} setReload={setReload} />
                        </Paper>
                    </Grid>
                </Grid>
                <Paper className={classes.root} style={{ height: '145px' }}>
                    <AddGame user={props.user} setReload={setReload} />
                </Paper>
                <Paper className={classes.root}>
                    <GameTable user={props.user} reload={reload} setReload={setReload} />
                </Paper>
            </>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}
export default WishList;