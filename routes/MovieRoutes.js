const express = require('express')
const { viewMovies, viewMovie, addMovie, updateMovie, deleteMovie, viewCurrentMovies } = require('../controllers/MovieController')
const { isAuthenticatedAdmin } = require('../middlewares/Auth')
const movieRouter = express.Router()

movieRouter.get('/', viewMovies) /**To view all the movies */
movieRouter.get('/today', viewCurrentMovies) /**To view current movies playing */
movieRouter.get('/:movieId', viewMovie) /**To view particular movie */
movieRouter.post('/', isAuthenticatedAdmin, addMovie) /**To add a new movie */
movieRouter.put('/:movieId', isAuthenticatedAdmin, updateMovie) /**To update a existing movie details */
movieRouter.delete('/:movieId', isAuthenticatedAdmin, deleteMovie) /**To delete a particular movie */

module.exports = movieRouter