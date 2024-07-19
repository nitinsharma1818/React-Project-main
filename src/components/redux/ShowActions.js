import axios from "axios"
import { SET_SHOW, SET_BOOKING_STATUS, SET_SEAT_ERROR, CLEAR_SEAT_ERROR } from "./ActionTypes"
import { ShowBase } from "../api/BaseUrl"
import { axiosUserInstance } from "../api/Interceptors"

const setShow = (dates) => {
    return {
        type : SET_SHOW,
        payload : dates
    }
}
const setBooking = (message) => {
    return {
        type : SET_BOOKING_STATUS,
        payload : message
    }
}
const setSeatError = (message) => {
    return {
        type : SET_SEAT_ERROR,
        payload : message
    }
}
const clearSeatError = () => {
    return {
        type : CLEAR_SEAT_ERROR
    }
}
/**To fetch all the show available for the movie id received */
const viewShow = (movieId) => {
    return(dispatch) => {
        axios.get(`${ShowBase}/${movieId}`)
        .then((show) => {
            dispatch(setShow(show.data.showAvailableDates))
        })
        .catch((err) => console.log(err))
    }
}
/**To post the booking details to db */
const bookShow = (bookingDetails) => {
    return(dispatch) =>
    {
        axiosUserInstance({
            url: `shows/book`,
            method: "post",
            data : bookingDetails
        }) 
    .then( book => {
        dispatch(setBooking(book.data.message))
    })
    .catch(err => {
        if(err.response.status === 400)
        {
            dispatch(setSeatError(err.response.data.errorMessage))
        }
    })}
}
export {
    viewShow,
    bookShow,
    clearSeatError
}