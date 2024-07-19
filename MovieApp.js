const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const movieRouter = require('./routes/MovieRoutes')
const userRouter = require('./routes/UserRoutes')
const showRouter = require('./routes/ShowRoutes')
const bookRouter = require('./routes/BookingRoutes')
const adminRouter = require('./routes/AdminRouter')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/movies',movieRouter)
app.use('/users',userRouter)
app.use('/shows',showRouter)
app.use('/bookings',bookRouter)
app.use('/admin',adminRouter)

mongoose.connect(process.env.DATABASE_CONNECT_STRING)
.then(() => {
    console.log("Db got connected")
})
.then(() => {
    console.log(`Server is running on port : ${process.env.PORT_NUMBER}`)
    app.listen(3040)})
.catch(err => console.log("Error in connecting to database, error : " ,err.message))

/** 
 * connect string : 
 *          mongodb+srv://admin:<password>@cluster0.vdogt.mongodb.net/?retryWrites=true&w=majority
 * password : 
 *          kU1ZxQYOoE0Tt2KA
 *  */