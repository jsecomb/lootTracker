import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Doughnut, Line } from "react-chartjs-2";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';
import { useTheme } from '@material-ui/core/styles';

///this function does not appear to be working to set intial datastatefor donut
function WishListDetails(props) {
    const initialDataState = {
        labels: ['Amount Spent', 'Amount Remaining'],
        datasets: [
            {
                label: 'Total Budget Usage',
                backgroundColor: [
                    '#f26005',
                    '#66798b'
                ],
                data: [200, 250]
            }
        ]
    };

    const [wishlist, setWishlist] = useState({});
    const [doughnutData, setDoughnutData] = useState(initialDataState);
    const [lineData, setLineData] = useState({});
    const [lineMax, setLineMax] = useState(0);

    useEffect(() => {
        loadWishlist();
    }, [])

    const compare = (a, b) => {
        const gameA = a.purchaseDate;
        const gameB = b.purchaseDate;
        let comparison = 0
        if (gameA > gameB) {
            comparison = 1
        } else if (gameA < gameB) {
            comparison = -1
        }
        return comparison
    }

    const loadWishlist = () => {
        API.Wishlist.getAllByUserId(props.user.id).then(res => {
            setWishlist(res.data);
            console.log(res.data);
            let amountSpent = 0;
            let lineYSet = [];
            let lineXSet = [];
            const allGames = res.data[0].WishlistItems
            allGames.sort(compare)
            allGames.map(item => {
                amountSpent += parseInt(item.Game.price);
                let date = new Date(item.purchaseDate);
                lineXSet.push(date.toLocaleDateString('en-US'));
                lineYSet.push(item.Game.price);
            });

            let max = lineYSet.reduce(function (a, b) {
                return Math.max(a, b);
            })
            setLineMax(max)

            console.log(lineYSet)
            setLineData({
                labels: lineXSet,
                datasets: [{
                    label: 'Your spending',
                    data: lineYSet,
                    fill: true,
                    backgroundColor: '#66798b',  
                    borderColor: '#c46000', 
                }],
            })

            console.log(amountSpent);
            const amountRemaining = parseInt(res.data[0].budget) - amountSpent;
            setDoughnutData({
                line: {
                    borderColor: '#66798b',
                },
                labels: ['Amount Spent', 'Amount Remaining'],
                datasets: [
                    {
                        label: 'Total Budget Usage',
                        backgroundColor: [
                            '#c46000',  
                            '#66798b',  
                        ],
                        data: [amountSpent, amountRemaining]
                    }
                ]
            })
        })
    }

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: "row",
            borderTop: 1,
            marginTop: '27px',
            marginBottom: '25px',
        },
        charts: {
            height: '100%',
            padding: '20px',
            margin: '20px 0',
            border: 4,
            borderColor: '#fff',
            backgroundColor: '#424242',
            color: '#fff',
            [theme.breakpoints.up('lg')]:{
                height: '150%',
                width: '150%',
            },
        },
    })
    );

    const classes = useStyles()

    return (
        <>
            <Grid container spacing={3} className={classes.root}>
                {/* <Grid item xs={false} lg={1}></Grid> */}
                <Grid item xs={12} lg={6} id='donutgrid' className={classes.charts}>
                    <Doughnut
                        data={doughnutData}
                        options={{ maintainAspectRatio: false }}
                        options={{
                            title: {
                                display: true,
                                text: 'Total Budget Usage',
                                fontSize: 20,
                                fontColor: '#fff',
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                                fontColor: '#fff',
                                width: '20%',
                                height: '10%',
                                labels: {
                                    fontColor: "#fff",
                                }
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} lg={6} id='lineGrid' className={classes.charts}>
                    <Line
                        data={lineData}
                        id='linechart'
                        options={{
                            title: {
                                display: true,
                                text: 'Spending Over Time',
                                fontSize: 20,
                                fontColor: '#fff',
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            suggestedMin: 0,
                                            suggestedMax: [lineMax],
                                            fontColor: '#fff',

                                        },
                                        labels: {
                                            fontColor: '#fff',
                                        },
                                        dots: {
                                            fontColor: '#fff',
                                        },
                                    },
                                ],
                                xAxes: [
                                    {
                                        ticks: {
                                            fontColor: '#fff',
                                        },
                                        // labels: {
                                        //     fontColor: '#fff',
                                        // },
                                    }
                                ]
                            },
                            legend: {
                                display: false,
                                labels: {
                                    fontColor: "#fff",
                                }
                            },  
                        }}
                    />
                </Grid>
                {/* <Grid item xs={false} md={1}></Grid> */}
            </Grid>
        </>
    )
}


export default WishListDetails;