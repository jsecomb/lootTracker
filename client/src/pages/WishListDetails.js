import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import API from "../utils/API";
import { Doughnut, Line } from "react-chartjs-2";

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

    return (
        <>
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
                              suggestedMax: 120
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
        </>
    )

}


export default WishListDetails;