import * as types from '../types/search'
import initialState from './initialState'

export default function searchReducer(state = initialState.search, action){
    switch(action.type){
        case types.LOAD_SEARCH_SUCCESS:
            return action.results
        default:
        return state
  }
}
