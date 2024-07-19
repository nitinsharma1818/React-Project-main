import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import MovieCard from '../movie/MovieCard'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { viewMovies } from '../redux/MovieActions'

/**All the movies added by admin will be shown here */
const AdminHome = () => {
  const movies = useSelector( state => state.movie.movies )
  const dispatch = useDispatch()
    useEffect(() => {
      dispatch(viewMovies())
    }, [])
    return(<>
      <Box p={15} pt={15} >
      <Grid container spacing={5}>
      {
        movies.map( movie => <MovieCard key={movie._id} data={movie}></MovieCard>)
      }
      </Grid>
      </Box>
    
    </>)
 }

 export default AdminHome
