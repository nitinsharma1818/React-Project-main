import { SET_USER_TOKEN, SET_USER_RETRIEVE_TOKEN, DELETE_USER_TOKEN, SET_PROFILE, SET_LOGIN_ERROR , SET_SIGN_UP, SET_SIGNUP_ERROR,  SET_USER_REFRESH } from "./ActionTypes"
import axios from "axios"
import { UserBase } from "../api/BaseUrl"
import { axiosUserInstance } from "../api/Interceptors"

const setUserToken = (token) => {
    return {
        type : SET_USER_TOKEN,
        token : token.accessToken,
        payload : token.message
    }
}
const setUserRetrieveToken = (token) => {
    return {
        type : SET_USER_RETRIEVE_TOKEN,
        token
    }
}
const deleteUserToken = () => {
    return {
        type : DELETE_USER_TOKEN
    }
}
const setProfile = (user) => {
    return {
        type : SET_PROFILE,
        payload : user
    }
}
const refreshProfile = () => {
    return {
        type : SET_USER_REFRESH
    }
}
const setLoginError = (error) => {
    return {
        type : SET_LOGIN_ERROR,
        payload : error
    }
}
const setSignUpError = (error) => {
    return {
        type : SET_SIGNUP_ERROR,
        payload : error
    }
}
const setSignUp = (success) => {
    return {
        type : SET_SIGN_UP,
        payload : success
    }
}
/**To login as user by posting all the login credetials */
const loginUser = (user) => {
    return (dispatch) => {
        axios.post(`${UserBase}/login`,user)
        .then( token => {
            sessionStorage.setItem("usersToken", token.data.accessToken)
            dispatch(setUserToken(token.data))
        })
        .catch( error => {
            dispatch(setLoginError(error.response.data.errorMessage))
        })
    }
}
/**To register a new user */
const signUpUser = (user) => {
    return(dispatch) => {
        axios.post(`${UserBase}/signup`,user)
        .then(response => {
        dispatch(setSignUp(response.data.message))
        })
        .catch( error => {
        dispatch(setSignUpError(error.response.data.errorMessage))
         })
    }
}
/**To retreive the token when the page is refreshed */
const retrieveUserToken = () => {
    return(dispatch, getState) => {
        const token = getState().user.userToken
        if(token){
            dispatch(setUserRetrieveToken(token))
        } 
    }
}
/**To fetch a single user details */
const viewProfile = (userId) => {
    return(dispatch) => {
        axiosUserInstance({
            url: `users/my-profile/${userId}`,
            method: "get"
        })
        .then((user) => {
            dispatch(setProfile(user.data.user))
        })
        .catch( error => console.log(error) )
    }
}
/**To update a user details to the db */
const updateProfile = (userDetails,userId) => {
    return (dispatch) => {
        axiosUserInstance({
            url: `users/${userId}`,
            method: "put",
            data : userDetails
        })
        .then(() => { 
            dispatch(setProfile(userDetails))
        })
        .catch( error => console.log("error : ",error))
    }
}

export {
    loginUser,
    retrieveUserToken,
    deleteUserToken,
    viewProfile,
    updateProfile,
    signUpUser
}