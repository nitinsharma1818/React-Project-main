import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const useStyles = makeStyles({
    root : {
        margin : 'auto',
        maxWidth : 350,
        maxHeight : 500,
        padding : 15,
        marginBottom : 20
    }
})
/**Admin can able to view all the bookings from Bookings component */
const AdminBookCard = ({ data }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            <Card className={classes.root}>
                <CardMedia height={250}
                    component="img"
                    alt="No image found"
                    image={data.movie.movieImageUrl}
                />
                <CardContent>
                    <Typography gutterBottom  component="h6">
                    <span>Movie Name : </span>{data.movie.movieName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    <span>Booked Seats : </span>{data.bookSeat.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                    <span>Show Date : </span>{data.bookDate.substring(0,10)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="h2">
                    <span>Booked By : </span>{data.user.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"  component="h2">
                    <span>User's Account : </span>{data.user.userEmail}
                    </Typography>
                </CardContent>
            
            </Card>
       
        </>
    )
}

export default AdminBookCard