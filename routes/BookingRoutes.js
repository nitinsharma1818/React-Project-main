const express = require('express')
const { viewBookings, saveBookings, viewMyBookings } = require('../controllers/BookController')
const { isAuthenticatedUser, isAuthenticatedAdmin } = require('../middlewares/Auth')
const bookRouter = express.Router()

bookRouter.get('/', isAuthenticatedAdmin, viewBookings) /**To view all the bookings for a movie in admin side */
bookRouter.get('/:userId', isAuthenticatedUser, viewMyBookings) /**To view my bookings in user side */

module.exports = bookRouter

