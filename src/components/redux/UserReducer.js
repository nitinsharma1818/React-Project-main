import jwtdecode from 'jwt-decode'

const userInitialState = {
    userToken : sessionStorage.getItem("usersToken"),
    _userId : '',
    userRole : '',
    loginMessage : '',
    signupMessage : '',
    loginSuccess : false,
    signupSuccess : false,
    profile : ''
}


const userReducer = (state = userInitialState, action) => {
    switch(action.type){
        case 'SET_USER_TOKEN' : 
        case 'SET_USER_RETRIEVE_TOKEN' :
        const user = jwtdecode(action.token)
        return {
            ...state,
            userToken : action.token,
            _userId : user.id,
            userRole : user.role,
            loginMessage : action.payload,
            signupMessage : '',
            profile : '',
            loginSuccess : true,
            signupSuccess : false
        }
        case 'SET_SIGN_UP' : return {
            ...state,
            userToken : '',
            signupMessage : action.payload,
            signupSuccess : true,
            loginSuccess : false
        }
        case 'SET_LOGIN_ERROR' : return {
            ...state,
            loginMessage : action.payload,
            loginSuccess : false,
            signupSuccess : false,
            signupMessage : ''
        }
        case 'SET_SIGNUP_ERROR' : return {
            ...state,
            signupMessage : action.payload,
            loginMessage : '',
            loginSuccess : false,
            signupSuccess : false
        }
        case 'DELETE_USER_TOKEN' : sessionStorage.removeItem("usersToken")
        return {
            userToken : '',
            _userId : '',
            userRole : '',
            loginMessage : '',
            signupMessage : '',
            profile : '',
            loginSuccess : false,
            signupSuccess : false
        }
        case 'SET_PROFILE' : return {
            ...state,
            profile : action.payload
        }
        case 'SET_USER_REFRESH' : return {
            ...state,
            profile : ''
        }
        default : return state
    }
}

export {
    userReducer
}