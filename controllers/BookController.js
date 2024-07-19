const Movie = require('../model/Movie')
const Show = require('../model/Show')
const Book = require('../model/Book')
const User = require('../model/User')

/**To save my bookings */
const saveBookings = async(book) => {
    let bookings,booked
    bookings = await new Book(book)
    return booked = await bookings.save()
}
/**To view my bookings */
const viewMyBookings = async(req,res) => {
    let bookings,user
    let userId = req.params.userId
    try{
        if(userId.length !== 24)
        throw "Invalid Object Id"
        user = await User.findById(userId)
        if(user === null)
        throw "No user found with the id mentioned"
        bookings = await Book.find({ user : userId }).populate([{ path : 'user' },{ path : 'movie' }])
        if(bookings.length <= 0)
        throw "No bookings have been recorded"
        return res.status(200).json({bookings})
    }
    catch(err) {
        return res.status(404).json({ errorMessage : err })
    }
}
/**To view all the bookings for a movie in admin side */
const viewBookings = async(req,res) => {
    let bookings
    try{
        bookings = await Book.find().populate([{path : 'user'},{path : 'movie'}])
        if(bookings.length <= 0)
        throw "No bookings have been recorded"
        return res.status(200).json({bookings})
    }
    catch(err) {
        return res.status(404).json({ errorMessage : err.message })
    }
}

module.exports = {
    saveBookings,
    viewBookings,
    viewMyBookings
}
    
