const express = require('express')
const { showSelectedMovie, bookShow, displaySeats } = require('../controllers/ShowController')
const { isAuthenticatedUser } = require('../middlewares/Auth')
const showRouter = express.Router()

showRouter.get('/:movieId', showSelectedMovie) /**To list all the dates available for the movie mentioned */
showRouter.post('/book', isAuthenticatedUser, bookShow) /**To book a movie show in user side */

module.exports = showRouter

