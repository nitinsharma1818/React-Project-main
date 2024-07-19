import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/system'
import MovieDisplay from '../movie/MovieDisplay'
import { useDispatch, useSelector } from 'react-redux'
import { viewMovies } from '../redux/MovieActions'

/**User's Movie Page */
const Movies = () => {
  const dispatch = useDispatch()
  const movies = useSelector( state => state.movie.movies )

  /**To view all the movies that are available from Movie collection and passing that data as props to movie cards component */
  useEffect(() => {
    dispatch(viewMovies())
  }, [])
  return (<>
    <Box p={15} pt={15} >
      <Grid container spacing={5}>
        {
          movies.map(movie => <MovieDisplay key={movie._id} data={movie}></MovieDisplay>)
        }
      </Grid>
    </Box>
  </>)
}

export default Movies
