import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from '../../styles/styles'
import CarouselContainer from '../movie/Carousel'
import CurrentMovies from '../movie/CurrentMovies'
import { viewCurrentMovies } from '../redux/MovieActions'
import bookingError from '../../assets/bookingError.jpg'
import '../../styles/Style.css'

/**User's Home Page */
 const Home = () => {
  const [toggle, setToggle] = useState();
  const dispatch = useDispatch()
  const current = new Date()
  const classes = useStyles()
  const currentMovies = useSelector( state => state.movie.currentMovies )
  /**To switch between now showing movies and upcoming movies */
  const tabChange = (event, newTab) => {
    setToggle(newTab)
  }
  /**To display the movies that are currently showing in the screen */
  const displayCurrentMovies = () => {
    dispatch(viewCurrentMovies(current.toISOString()))
  }
    return(<>
      <CarouselContainer/>
      <ToggleButtonGroup color="primary" value={toggle} exclusive onChange={tabChange} className={classes.movieToggle}>
      <ToggleButton onClick={displayCurrentMovies} value="Now Showing">Now Showing</ToggleButton>
      <ToggleButton value="Upcoming Movies">Upcoming Movies</ToggleButton>
      </ToggleButtonGroup>
      <Box p={15} pt={15} >
      <Grid container spacing={5}>
        {
         toggle === 'Now Showing' && currentMovies.length > 0 && currentMovies.map( movie => <CurrentMovies key={movie._id} data={movie} />)
        }
        {
          toggle === 'Upcoming Movies' && <img className='upcome-movie-error' src={bookingError}></img>
        }
      </Grid>
    </Box>
      
    </>)
 }

 export default Home