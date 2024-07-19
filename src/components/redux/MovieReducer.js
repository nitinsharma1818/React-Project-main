let movieInitialState = {
    movies : [],
    movie : '',
    currentMovies : [],
    movieMessage : '',
    movieSuccess : false
}

const movieReducer = ( state = movieInitialState, action ) => {
    switch(action.type){
        case 'SET_MOVIES' : return {
            ...state,
            movies : action.payload,
            movieMessage : ''
        }
        case 'SET_MOVIE' :  return {
            ...state,
            movie : action.payload
        }
        case 'SET_ADDED_MOVIE' : return {
            ...state,
            movieMessage : action.payload,
            movieSuccess : true,
        }
        case 'SET_CURRENT_MOVIES' : return {
            ...state,
            currentMovies : action.payload
        }
        case 'SET_MOVIE_ERROR' : return {
            ...state,
            movieMessage : action.payload,
            movieSuccess : false
        }
        case 'SET_DELETE_MOVIE' : return {
            ...state,
            movieMessage : action.payload,
            movieSuccess : true
        }
        case 'CLEAR_MOVIE_ERROR' : return {
            ...state,
            movieMessage : '',
            movieSuccess : ''
        }
        default : return state
    }
}

export{
    movieReducer
}