import * as types from '../types/list'
import { listURL } from '../utils'

export function loadListSuccess(items){
    return { type: types.LOAD_LIST_SUCCESS, items }
}

export function loadListFailure(){
    return { type: types.LOAD_LIST_FAILURE }
}

export function loadListComSuccess(com){
    return { type: types.LOAD_COM_SUCCESS,com }
}

export function loadListComFailure(){
    return { type: types.LOAD_COM_FAILURE }
}

export function loadItems(collection,id, endpoint){
    return dispatch => {
        fetch(listURL[endpoint](collection,id))
        .then(response => response.json())
        .then(json => json.results)
        .then(com => dispatch(loadListSuccess(com)))
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

export function comment(id,commentary, collection){  
    let com;
    collection ==='movie' ? com = {mediaId: id, body: commentary, collection: collection}: com = {mediaId: id, body: commentary,collection: collection};
    localStorage.setItem('comentario', com);

    return dispatch => {
        fetch(listURL['comentariosPost'](collection,id), {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(com)
          })
        .then(response => response.json())
        .then(items => dispatch(loadListComSuccess(items)))
        .catch(error => {
            dispatch(loadListComFailure())
            alert('We could not load the page at this time.')
        })
    }
}






