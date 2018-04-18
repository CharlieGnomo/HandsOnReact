import * as types from '../types/shows'
import initialState from './initialState'
import _ from './../../node_modules/lodash'

export default function showsReducer(state = initialState.shows, action){
    switch(action.type){
        case types.DELETE_SHOW_SUCCESS:
            _.remove(state, (o) => {
                return o.id === action.id
            });
            return [...state]
            break;
        case types.LOAD_SHOWS_SUCCESS:
            if(action.page === 1) {
                return action.shows
            }
            else {
                return [
                    ...state,
                    ...action.shows,
                ]
            }
            break;
        default:
        return state
  }
}
