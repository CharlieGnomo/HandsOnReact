import * as types from '../types/list'
import { listURL } from '../utils'

export function loadListSuccess(items){
    return { type: types.LOAD_LIST_SUCCESS, items }
}

export function loadListFailure(){
    return { type: types.LOAD_LIST_FAILURE }
}

export function loadItems(collection,id, endpoint){
    return dispatch => {
        fetch(listURL[endpoint](collection,id))
        .then(response => response.json())
        .then(json => json.results)
        .then(items => dispatch(loadListSuccess(items)))
        .catch(error => {
            dispatch(loadListFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function loadComments(collection,id){
    return dispatch => {
        fetch(listURL['comentarios'](collection,id))
        .then(response => response.json())
        .then(items => dispatch(loadListSuccess(items)))
        .catch(error => {
            dispatch(loadListFailure())
            alert('We could not load the page at this time.')
        })
    }
}






