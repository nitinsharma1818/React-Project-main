import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    root : {
        margin : 'auto',
        maxWidth : 350,
        maxHeight : 500,
        padding : 15,
        marginBottom : 20,
    }
})
/**Movie Display Page for admin side */
const MovieDisplay = ({ data }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const userId = useSelector(state => state.user._userId)
    /**To view the particular movie that is selected by an user by navigating the movie id to seperate page */
    const viewHandler = () => {
        navigate(`/movies/${data._id}`)
    }
    /**To book the movie selected by user by navigating it to shows page*/
    const bookHandler = () => {
        if(userId === '')
        return navigate('/auth',{replace:true})
        navigate(`/movies/shows/${data._id}`)
    }
    return (
        <>
            <Card className={classes.root}>
                <CardMedia height={250}
                    component="img"
                    alt="No image found"
                    image={data.movieImageUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.movieName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                       {data.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={viewHandler} color="primary" style={{marginRight:180}}>View</Button>
                    <Button onClick={bookHandler} size="small" color="warning">Book</Button>
                </CardActions>
            </Card>
       
        </>
    )
}

export default MovieDisplay