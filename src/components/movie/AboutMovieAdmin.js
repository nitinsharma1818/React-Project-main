import { Box, Button, SnackbarContent, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { viewMovie } from "../redux/MovieActions";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import '../../styles/Style.css'

/**Admin can select and see particular movie */
const AboutMovieAdmin = () => {
    let { movieId } = useParams();
    const dispatch = useDispatch()
    const movieDetails = useSelector(state => state.movie.movie)
    const { movieName, description, actorName, directorName, startBookingDate, ticketCost } = movieDetails
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(viewMovie(movieId))
    }, [movieId])
    const editHandler = () => {
        navigate(`/admin/movies/${movieId}/edit`)
    }
    const goBack = () => {
        navigate(-1)
    }
    return (<>
    <Button variant="contained" endIcon={<ArrowBackSharpIcon className="back-icon"/>} onClick={goBack} className='back-button'></Button>
        <Box sx={{
            width: 400,
            height: 370,
            margin: 'auto',
            marginTop:'90px'
        }}>
            <iframe src={movieDetails.movieVideoUrl} width='395px'  style={{marginBottom : '10px'}} allow='autoplay'></iframe>
            <Stack spacing={1} sx={{ maxWidth: 600 }}>
            <SnackbarContent message={movieName} action="Movie Name" />
            <SnackbarContent message={actorName} action="Actor Name"/>
            <SnackbarContent message={directorName} action="Director Name" />
            <SnackbarContent message={description} action="Description" />
            <SnackbarContent message={startBookingDate} action="Release Date" />
            <SnackbarContent message={ticketCost} action="Ticket Cost" />
            </Stack>
            <Button onClick={editHandler} variant="contained" sx={{ margin: 1, borderRadius: 2, marginLeft: 20, marginTop: 1 }} color='warning'>Edit</Button>
        </Box>
    </>)
}

export default AboutMovieAdmin