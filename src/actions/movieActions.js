import * as types from '../types/movie'


export function loadMovieSuccess(movie){
    return { type: types.LOAD_MOVIE_SUCCESS, movie }
}

export function loadMovieFailure(){
    return { type: types.LOAD_MOVIE_FAILURE }
}

export function loadMovie(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(movie => dispatch(loadMovieSuccess(movie)))
        .catch(error => {
            dispatch(loadMovieFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function loadRandomMovie(){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(movie => {
            //Math.random() * (max - min) + min;
            let iM = Math.floor(Math.random() * ((movie.id)-(30))+30);
            dispatch(loadMovie(iM));
        })
        .catch(error => {
            dispatch(loadMovieFailure())
            alert('We could not load the page at this time.')
        })
    }
}





