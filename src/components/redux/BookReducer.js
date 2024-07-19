const bookInitialState = {
    bookings : [],
    allBookings : [],
    bookingSuccess : false,
    bookingMessage : ''
}

const bookReducer = (state = bookInitialState, action) => {
    switch(action.type){
        case 'SET_BOOKING' : return {
            ...state,
            bookings : action.payload,
            bookingMessage : '',
            bookingSuccess : true
        }
        case 'SET_BOOKINGS' : return {
            ...state,
            allBookings : action.payload
        }
        case 'SET_BOOKING_ERROR' : return {
            ...state,
            bookingMessage : action.payload,
            bookingSuccess : false
        }
        case 'CLEAR_BOOKING' : return {
            ...state,
            bookings : ''
        }
        case 'CLEAR_BOOKING_ERROR' : return {
            ...state,
            bookingMessage : '',
            bookingSuccess : ''
        }
        default : return state
    }
}


export {
    bookReducer
}