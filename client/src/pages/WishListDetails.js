import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import API from "../utils/API";
import { Doughnut } from "react-chartjs-2";

function WishListDetails(props) {
    const initialDataState = {
        labels: ['Amount Spent', 'Amount Remaining'],
        datasets: [
            {
                label: 'Total Budget Usage',
                backgroundColor: [
                    '#ff0505',
                    '#17e600'
                ],
                data:[475, 25] 
            }
        ]
    };
    const [wishlist, setWishlist] = useState({});
    const [doughnutData, setDoughnutData] = useState(initialDataState);

    useEffect(() => {
        loadWishlist();
    }, [])

    const loadWishlist = () => {
        API.Wishlist.getAllByUserId(props.user.id).then(res => {
            setWishlist(res.data);
            console.log(res.data);
            let amountSpent = 0;
            res.data[0].WishlistItems.map(item => {
                amountSpent += parseInt(item.Game.price)
            });
            console.log(amountSpent);
            const amountRemaining = parseInt(res.data[0].budget) - amountSpent;
            setDoughnutData({
                labels: ['Amount Spent', 'Amount Remaining'],
                datasets: [
                    {
                        label: 'Total Budget Usage',
                        backgroundColor: [
                            '#ff0505',
                            '#17e600'
                        ],
                        data:[amountSpent, amountRemaining] 
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
                            title:{
                                display: true,
                                text: 'Total Budget Usage',
                                fontSize: 20
                            },
                            legend:{
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
        </>
    )

}


export default WishListDetails;