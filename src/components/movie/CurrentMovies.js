import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useStyles } from '../../styles/styles'
import '../../styles/Style.css'

/**To display each movie in a Card from My Bookings Page */
const CurrentMovies = ({ data }) => {
    const classes = useStyles()
    return (
        <>
            <Card className={classes.userBookCard}>
                <CardMedia height={250}
                    component="img"
                    alt="No image found"
                    image={data.movie.movieImageUrl}
                />
                <CardContent>
                    <Typography gutterBottom component="h6">
                    <span>Movie Name : </span>{data.movie.movieName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    <span>Ticket Cost : </span>{data.movie.ticketCost}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    <span>Show Date : </span>{data.movie.startBookingDate.substring(0,10)}
                    </Typography>
                </CardContent>
            
            </Card>
       
        </>
    )
}

export default CurrentMovies