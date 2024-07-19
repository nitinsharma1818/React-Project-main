const showInitialState = {
    shows : '',
    seats : '',
    showMessage : '',
    showSuccess : false
}
const showsReducer = (state = showInitialState, action) => {
    switch(action.type){
        case 'SET_SHOW' : return {
            ...state,
            shows : action.payload
        }
        case 'SET_SEATS' : return {
            ...state,
            seats : action.payload
        }
        case 'SET_BOOKING_STATUS' : return {
            ...state,
            showMessage : action.payload,
            showSuccess : true
        }
        case 'SET_SEAT_ERROR' : return {
            ...state,
            showSuccess : false,
            showMessage : action.payload
        }
        case 'CLEAR_SEAT_ERROR' : return {
            ...state,
            showSuccess : '',
            showMessage : ''
        }
        default : return state
    }
}

export {
    showsReducer
}