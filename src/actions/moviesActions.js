import * as types from '../types/movies'
import { moviesURL } from '../utils'

import _ from 'lodash'

export function loadMoviesSuccess(movies, page){
    return { type: types.LOAD_MOVIES_SUCCESS, movies, page }
}

export function loadMoviesFailure(){
    return { type: types.LOAD_MOVIES_FAILURE }
}

export function deleteMovieSuccess(id){
    return { type: types.DELETE_MOVIE_SUCCESS, id}
}

export function loadMovies(page = 1, endpoint = 'popular'){
    return dispatch => {
        fetch(moviesURL[endpoint](page))
        .then(response => response.json())
        .then(json => json.results)
        .then(movies => {
            fetch(moviesURL['postDelMovie']())
            .then(response => response.json())
            .then(deletes => {
                _.remove(movies,((movie) => {
                    let cont = 0;
                    let encontrado = false;
                    while(!encontrado && cont < deletes.length){
                        encontrado = deletes[cont].movieId == movie.id; 
                        cont++;
                    }
                    return encontrado;
                }));
                console.log(deletes);
                dispatch(loadMoviesSuccess(movies, page))
            })
            .catch(error => {
                dispatch(loadMoviesFailure())
                alert('We could not load the page at this time.')
            })
            
        })
        .catch(error => {
            dispatch(loadMoviesFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function deleteMovie(id){
    return dispatch => {
        fetch(moviesURL['postDelMovie'](),
        {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({movieId:id})
          }
        )
        .then(response => console.log(response.json()))
        .catch(error => {
            dispatch(loadMoviesFailure())
            alert('We could not load the page at this time.')
        })
        dispatch(deleteMovieSuccess(id))
    };
}






