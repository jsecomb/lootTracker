import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Doughnut, Line } from "react-chartjs-2";
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function WishListDetails(props) {
    const initialDataState = {
        labels: ['Amount Spent', 'Amount Remaining'],
        datasets: [
            {
                label: 'Total Budget Usage',
                backgroundColor: [
                    '#f26005',
                    '#787878'
                ],
                data: [475, 25]
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
    
    const compare = (a,b) => {
        const gameA = a.purchaseDate;
        const gameB = b.purchaseDate;
        let comparison = 0
        if (gameA > gameB) {
            comparison = 1
        } else if(gameA < gameB) {
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

            let max = lineYSet.reduce(function(a, b) {
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
                    backgroundColor: '#787878',
                    borderColor: '#f26005'
                }]
            })
            console.log(amountSpent);
            const amountRemaining = parseInt(res.data[0].budget) - amountSpent;
            setDoughnutData({
                labels: ['Amount Spent', 'Amount Remaining'],
                datasets: [
                    {
                        label: 'Total Budget Usage',
                        backgroundColor: [
                            '#f26005',
                            '#787878'
                        ],
                        data: [amountSpent, amountRemaining]
                    }
                ]
            })
        })
    }

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
                <Doughnut
                    data={doughnutData}
                    options={{
                        title: {
                            display: true,
                            text: 'Total Budget Usage',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />     
            </Grid>
            <Grid item xs={12} sm={6}>
                <Line 
                    data={lineData}
                    options={{
                        title: {
                            display: true,
                            text: 'Spending Over Time',
                            fontSize: 20
                        },
                        scales: {
                            yAxes: [
                            {
                                ticks: {
                                suggestedMin: 0,
                                suggestedMax: [lineMax]
                                }
                            }
                            ]
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />   
            </Grid>
        </Grid>
        </>
    )
}


export default WishListDetails;