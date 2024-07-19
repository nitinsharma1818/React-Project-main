const initialState = {
    signup : false
}
const signUpReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_SIGNUP' : return {
            ...state,
            signup : true
        }
        case 'SET_SIGNOUT' : return {
            ...state,
            signup : false
        }
        case 'TOGGLE_SIGNUP' : return {
            ...state,
            signup : ! state.signup
        }
        default : return state
    }
}

export {
    signUpReducer
}