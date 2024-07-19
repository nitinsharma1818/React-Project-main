import { combineReducers } from "@reduxjs/toolkit"
import { movieReducer } from "./MovieReducer"
import { userReducer } from "./UserReducer"
import { adminReducer } from "./AdminReducer"
import { signUpReducer } from "./SignUpReducer"
import { bookingReducer, seatsReducer, showsReducer } from "./ShowReducer"
import { bookReducer } from "./BookReducer"

const root = combineReducers({
    movie : movieReducer,
    user : userReducer,
    admin : adminReducer,
    signUp : signUpReducer,
    show : showsReducer,
    book : bookReducer
})

export default root