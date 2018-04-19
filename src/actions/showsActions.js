import * as types from '../types/shows'
import { showsURL } from '../utils'

import _ from 'lodash'

export function loadShowsSuccess(shows, page){
    return { type: types.LOAD_SHOWS_SUCCESS, shows, page }
}

export function loadShowsFailure(){
    return { type: types.LOAD_SHOWS_FAILURE }
}

export function deleteShowSuccess(id){
    return { type: types.DELETE_SHOW_SUCCESS,id}
}

export function loadShows(page = 1, endpoint = 'popular'){
    return dispatch => {
        fetch(showsURL[endpoint](page))
        .then(response => response.json())
        .then(json => json.results)
        .then(shows => {
            fetch(showsURL['postDelShow']())
            .then(response => response.json())
            .then(deletes => {
                _.remove(shows,((show) => {
                    let cont = 0;
                    let encontrado = false;
                    while(!encontrado && cont < deletes.length){
                        encontrado = deletes[cont].showId == show.id; 
                        cont++;
                    }
                    return encontrado;
                }));
                console.log(deletes);
                dispatch(loadShowsSuccess(shows, page))
            })
            .catch(error => {
                dispatch(loadShowsFailure())
                alert('We could not load the page at this time.')
            })
            
        })
        .catch(error => {
            dispatch(loadShowsFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function deleteShow(id){
    return dispatch => {
        fetch(showsURL['postDelShow'](),
        {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({showId:id})
          }
        )
        .then(response => console.log(response.json()))
        .catch(error => {
            dispatch(loadShowsFailure())
            alert('We could not load the page at this time.')
        })
        dispatch(deleteShowSuccess(id))
    };
}






