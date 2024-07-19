import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBooking, viewBooking } from '../redux/BookActions'
import BookCard from './BookCards'
import '../../styles/Style.css'
import ReactJsAlert from "reactjs-alert"
import bookingError from '../../assets/bookingError.jpg'

/**Users My Bookings component*/
 const Bookings = () => {
    const userId = useSelector( state => state.user._userId )
    const bookings = useSelector( state => state.book.bookings )
    const { bookingSuccess, bookingMessage } = useSelector( state => state.book )
    const dispatch = useDispatch()
    const [status, setStatus] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
  
    /**To view the bookings for an user signed in and also the success,error pop up's */
    useEffect(() => {
      if(userId)
      dispatch(viewBooking(userId))
    },[userId])
    useEffect(() => {
      if((!bookingSuccess) && (bookingMessage !== ''))
      {
        setStatus(true)
        setType('error')
        setTitle(bookingMessage)
      }
    },[bookingSuccess, bookingMessage])
    return(<>
    {
      !bookingSuccess && bookingMessage!=='' && (<>
      <img className='bookings-error' src={bookingError}></img>
      </>)
    }
    <Box p={15} pt={15} >
      <Grid container spacing={5}>
        {
          bookings && bookings.map( book => <BookCard key={book._id} data={book}></BookCard>) 
        }
      </Grid>
    </Box>
    <ReactJsAlert
        status={status} type={type} title={title} Close = {(status) => {
        setStatus(false)
        }}/>
    </>)
 }

 export default Bookings