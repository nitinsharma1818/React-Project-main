import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom'
import { useStyles } from "../../styles/styles"
import { updateMovie, viewMovie } from "../redux/MovieActions"
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import '../../styles/Style.css'

/**Admin can edit the movies selected from movie card page */
const EditMovie = () => {
    const classes = useStyles()
    let { movieId } = useParams();
    const movieDetails = useSelector(state => state.movie.movie)
    const { movieImageUrl,
        movieVideoUrl,
        movieName,
        ticketCost,
        description,
        actorName,
        directorName,
        startBookingDate,
        endBookingDate} = movieDetails
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const [movie, setMovie] = useState({
      movieImageUrl,
      movieVideoUrl,
      movieName,
      ticketCost,
      description,
      actorName,
      directorName,
      startBookingDate,
      endBookingDate
    })

    useEffect(() => {
      dispatch(viewMovie(movieId))
    },[dispatch])
    
    useEffect(() => {
        if(movieDetails)
        setMovie({
            movieImageUrl,
            movieVideoUrl,
            movieName,
            ticketCost,
            description,
            actorName,
            directorName,
            startBookingDate,
            endBookingDate
        })
    },[movieDetails])
    
    const detailsHandler = (event) => {
        setMovie((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }
    const updateHandler = (event) => {
        event.preventDefault()
        dispatch(updateMovie(movie, movieId))
        navigate(`/admin/movies/${movieId}`) 
    }
    const goBack = () => {
      navigate(-1)
    }
    return(<>
    <Button variant="contained" endIcon={<ArrowBackSharpIcon className="back-icon"/>} onClick={goBack} className='back-button'></Button>
    <form onSubmit={ updateHandler }>
        <Box className = {classes.loginForm}>
          <Typography padding={1} variant='h4' textAlign="center">
          Movie Details
          </Typography>
          <TextField type={'text'} name='movieImageUrl' value={movie.movieImageUrl || ""} onChange={detailsHandler} placeholder='Image Url' margin='normal' required/>
          <TextField type={'text'} name='movieVideoUrl' value={movie.movieVideoUrl || ""} onChange={detailsHandler} placeholder='Video Url' margin='normal' required/>
          <TextField type={'text'} name='movieName' value={movie.movieName || ""} onChange={detailsHandler} placeholder='Movie Name' margin='normal' required/>
          <TextField type={'number'} name='ticketCost' value={movie.ticketCost || ""} onChange={detailsHandler} placeholder='Ticket Cost' margin='normal' required/>
          <TextField type={'text'} name='description' value={movie.description || ""} onChange={detailsHandler} placeholder='Description' margin='normal' required/>
          <TextField type={'text'} name='actorName' value={movie.actorName || ''} onChange={detailsHandler} placeholder='Actor Name' margin='normal' required/>
          <TextField type={'text'} name='directorName' value={movie.directorName || ""} onChange={detailsHandler} placeholder='Director Name' margin='normal' required/>
          <TextField type={'date'} name='startBookingDate' value={movie.startBookingDate || ""} onChange={detailsHandler}  margin='normal' required/>
          <TextField type={'date'} name='endBookingDate' value={movie.endBookingDate || ""} onChange={detailsHandler} margin='normal' required/>
          <Button type='submit' variant='contained' color='warning' style={{margin : '5% 0'}}>Update</Button>
        </Box>
      </form>
    </>)
}

export default EditMovie