const Movie = require('../model/Movie')
const Show = require('../model/Show')
const Book = require('../model/Book')
const User = require('../model/User')
const { saveBookings } = require('./BookController')

/**Add movie to show collection */
const addMovieShow = async(movieDetails) => {
    let show
    const {  _id, startBookingDate , endBookingDate } = movieDetails
    let days =  (( endBookingDate - startBookingDate ) / 60000) / 1440
    for(var i=0 ;i<=Math.round(days); i++)
    {
        show = await new Show({
        movie : _id,
        showDate : new Date(startBookingDate.getTime() + (1000 * i * 86400) ),
        seats:[]
    })
    await show.save()
    }
}
/**To list out all the dates for the movie selected */
const showSelectedMovie = async(req,res) => {
    const movieId = req.params.movieId
    try{
        if(movieId.length !== 24)
        throw "Invalid Object Id"
        const showAvailableDates = await Show.find({movie : movieId},{showDate : 1, _id : 0}).populate({path : 'movie'})
        const movie = await Movie.findById(movieId)
        if(!(showAvailableDates && movie))
        throw "No shows sheduled for this movie"
        return res.status(200).json({showAvailableDates})
    }
    catch(err){
        return res.status(400).json({errorMessage : err})
    }
}
/**To book a show and update the seats */
const bookShow = async(req,res) => {
    let show,book
    const { movieId, showDate, seats, userId } = req.body
    try{
        show = await Show.findOne( { movie : movieId, showDate } , { seats : 1, _id : 0 })
        if(!show)
        throw "Show not available"
        const seatsArray = show.seats
        if(seats.length <= 0)
        throw "please select seats to confirm your booking"
        const contains = seatsArray.some(element => {
            return seats.indexOf(element) !== -1;
          });
        if(contains)
        throw "please select other seats"
        show = await Show.updateOne({ showDate, movie : movieId },{ $push: {seats:{$each : [...seats]}} } )
        show = await Show.find({ showDate, movie : movieId }).populate({ path: 'movie'})
        book = {
            user : userId,
            bookDate : showDate,
            movie : movieId,
            bookSeat : seats
        }
        book = await saveBookings(book)
        await User.updateOne({ _id : userId },{ $push: {myBookings : book._id} })
        return res.status(200).json({message : "successfully your tickets have been confirmed", show})
    }
    catch(err){
        console.log("message : ",err)
        return res.status(400).json({errorMessage : err})
    }
}

module.exports = {
    addMovieShow,
    showSelectedMovie,
    bookShow
}