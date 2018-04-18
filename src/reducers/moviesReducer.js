import * as types from '../types/movies'
import initialState from './initialState'
import _ from './../../node_modules/lodash'

export default function moviesReducer(state = initialState.movies, action){
    switch(action.type){
        case types.DELETE_MOVIE_SUCCESS:
            _.remove(state, (o) => {
                return o.id === action.id
            });
            return [...state]
            break;
        case types.LOAD_MOVIES_SUCCESS:
            if(action.page === 1) {
                return action.movies
            }
            else {
                return [
                    ...state,
                    ...action.movies,
                ]
            }
            break;
        default:
        return state
  }
}
