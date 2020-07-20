import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Doughnut, Line } from "react-chartjs-2";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
                data: [0, 0]
            }
        ]
    };

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
            let amountSpent = parseInt(res.data[0].totalCost);
            let lineYSet = [];
            let lineXSet = [];
            const allGames = res.data[0].WishlistItems
            allGames.sort(compare)
            let filteredGames = allGames.filter(game => game.purchaseDate !== null)

            const dayTotals = {};

            for(let j=0; j<filteredGames.length; j++){
                let purchaseDate = filteredGames[j].purchaseDate;
                let price = parseFloat(filteredGames[j].Game.price)
                if (purchaseDate in dayTotals){
                    dayTotals[purchaseDate] += price;
                }
                else {
                    dayTotals[purchaseDate] = price;
                }
            }

            let dayTotalsArray = Object.entries(dayTotals)

            dayTotalsArray.map(item => {
                lineXSet.push(item[0]);
                lineYSet.push(item[1]);
            });

            let max = lineYSet.reduce(function (a, b) {
                return Math.max(a, b);
            })
            setLineMax(max)

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
            [theme.breakpoints.up('lg')]: {
                height: '150%',
                width: '150%',
            },
        },
    })
    );

    const classes = useStyles()

    if (props.user) {
        return (
            <>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12} id='donutgrid' className={classes.charts}>
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
                    <Grid item xs={12} id='lineGrid' className={classes.charts}>
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
                </Grid>
            </>
        )
    } else {
        return(
            <div>Loading...</div>
        )
    }
}

    export default WishListDetails;