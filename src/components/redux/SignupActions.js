import { SET_SIGNUP, SET_SIGNOUT, TOGGLE_SIGNUP } from "./ActionTypes"

const setSignUp = () => {
    return {
        type : SET_SIGNUP
    }
}
const setSignOut = () => {
    return {
        type : SET_SIGNOUT
    }
}
const toggleSignup = () => {
    return {
        type : TOGGLE_SIGNUP
    }
}

export {
    setSignUp,
    setSignOut,
    toggleSignup
}