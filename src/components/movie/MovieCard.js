import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMovieError, deleteMovie } from "../redux/MovieActions";
import ReactJsAlert from "reactjs-alert"

const useStyles = makeStyles({
    root : {
        margin : 'auto',
        maxWidth : 350,
        maxHeight : 500,
        padding : 15,
        marginBottom : 20,
    }
})
/**Movie Card component to display all the movies */
const MovieCard = ({ data }) => {
    const classes = useStyles()
    const admin = useSelector( state => state.admin )
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { movieSuccess, movieMessage } = useSelector( state => state.movie )
    const [status, setStatus] = useState(false)
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const viewHandler = () => {
        navigate(`/admin/movies/${data._id}`)
    }
    const deleteHandler = () => {
        if(admin._adminId === '')
        return navigate('/admin/login',{replace:true})
        dispatch(deleteMovie(data._id))
        dispatch(clearMovieError())
    }
    useEffect(() => {
    if(movieSuccess)
    {
      setStatus(true)
      setType('success')
      setTitle(movieMessage)
    }
    else if((!movieSuccess) && (movieMessage !== ''))
    {
      setStatus(true)
      setType('error')
      setTitle(movieMessage)
    }
    },[movieSuccess, movieMessage])
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
                    <Button onClick={viewHandler} size="small" color="primary" style={{marginRight:180}}>View</Button>
                    <Button onClick={deleteHandler} size="small" color="secondary">Delete</Button>
                </CardActions>
            </Card>
            <ReactJsAlert
            status = {status}
            type = {type}
            title = {title}
            Close = {(status) => {
            if(movieSuccess && movieMessage)
            {
            setStatus(false)
            dispatch(clearMovieError())
            }
            else if((!movieSuccess) && (movieMessage !== ''))
            {
            setStatus(false)
            dispatch(clearMovieError())
            }
      }}
      />
        </>
    )
}

export default MovieCard