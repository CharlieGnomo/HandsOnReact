import * as types from '../types/search'
import { searchURL } from '../utils'

import _ from 'lodash'

export function loadSearchSuccess(results, page){
    return { type: types.LOAD_SEARCH_SUCCESS, results, page }
}

export function loadSearchFailure(){
    return { type: types.LOAD_SEARCH_FAILURE }
}

export function loadSearch(text){
    return dispatch => {
        fetch(searchURL['search'](text,1))
        .then(response => response.json())
        .then(json => json.results)
        .then(search => dispatch(loadSearchSuccess(search)))
        .catch(error => {
            dispatch(loadSearchFailure())
            alert('We could not load the page at this time.')
        })
    }
}



