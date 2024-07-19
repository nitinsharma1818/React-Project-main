import { SET_MOVIES, SET_MOVIE, SET_UPDATED_MOVIE, SET_ADDED_MOVIE, SET_CURRENT_MOVIES, SET_MOVIE_ERROR, CLEAR_MOVIE_ERROR, SET_DELETE_MOVIE } from "./ActionTypes"
import axios from 'axios'
import { MovieBase } from "../api/BaseUrl"
import { axiosAdminInstance } from "../api/Interceptors"

const setMovies = (movies) => {
    return {
        type : SET_MOVIES,
        payload : movies
    }
}
const setUpdatedMovie = (movie) => {
    return {
        type : SET_UPDATED_MOVIE,
        payload : movie
    }
}
const setMovie = (movie) => {
    return {
        type : SET_MOVIE,
        payload : movie
    }
}
const setAddedMovie = (success) => {
    return {
        type : SET_ADDED_MOVIE,
        payload : success
    }
}
const setMovieError = (error) => {
    return {
        type : SET_MOVIE_ERROR,
        payload : error
    }
}
const clearMovieError = () => {
    return {
        type : CLEAR_MOVIE_ERROR
    }
}
const setDeleteMovie = (message) => {
    return {
        type : SET_DELETE_MOVIE,
        payload : message
    }
}
const setCurrentMovies = (movies) => {
    return {
        type : SET_CURRENT_MOVIES,
        payload : movies
    }
}
const viewMovies = () => {
    return(dispatch) => {
        axios.get(`${MovieBase}`)
        .then(movies => {
            dispatch(setMovies(movies.data.movies))
        })
        .catch( err => console.log(err) )
    }
}
/**To fetch todays movies that has been showing */
const viewCurrentMovies = (currentDate) => {
    return(dispatch) => {
        axios.get(`${MovieBase}/today/?current=${currentDate}`)
        .then(movies => {
            dispatch(setCurrentMovies(movies.data.movies))
        })
        .catch( err => {
            console.log("error : ",err)
        })
    }
}
/**To add a new movie by posting the movie details */
const addMovies = (movieDetails) => {
    return (dispatch) => {
        axiosAdminInstance({
            url: `movies`,
            method: "post",
            data:movieDetails
        })
        .then(movie => { 
            dispatch(setAddedMovie(movie.data.message))
        })
        .catch( error => {
            if(error.response.status === 400)
                {
                    if(error.response.data[0] && error.response.data[0].startBookingDate !== '')
                    dispatch(setMovieError(error.response.data[0].startBookingDate))
                    else if(error.response.data[0] && error.response.data[0].endBookingDate !== '')
                    dispatch(setMovieError(error.response.data[0].endBookingDate))
                    else
                    dispatch(setMovieError(error.response.data.errorMessage))
                }
        }
        )
    }
}
/**To fetch a single movie based on its id */
const viewMovie = (movieId) => {
    return(dispatch) => {
        axios.get(`${MovieBase}/${movieId}`)
        .then(movie => {
            dispatch(setMovie(movie.data.movie))
        })
        .catch( err => console.log(err) )
    }
}
/**To delete a specific movie */
const deleteMovie = (movieId) => {
    return(dispatch) => {
        axiosAdminInstance({
            url: `movies/${movieId}`,
            method: "delete"
        })
        .then((movie) => {
            dispatch(setDeleteMovie(movie.data.message))
        } )
        .catch( (error) => {
            if(error.response.status === 400)
            dispatch(setMovieError(error.response.data.errorMessage))
        })
    }
}
/**To update a edited movie to the db */
const updateMovie = (movieDetails,movieId) => {
    return(dispatch) => {
        axiosAdminInstance({
            url: `movies/${movieId}`,
            method: "put",
            data:movieDetails
        })
        .then(() => {
            dispatch(setUpdatedMovie(movieDetails))
        })
        .catch( err => console.log(err))
    }
}
export {
    addMovies,
    viewMovies,
    viewMovie,
    viewCurrentMovies,
    deleteMovie,
    updateMovie,
    clearMovieError
}