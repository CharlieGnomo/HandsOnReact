import * as types from '../types/list'
import initialState from './initialState'

export default function listReducer(state = initialState.list, action){
    switch(action.type){
        case types.LOAD_LIST_SUCCESS:
                return [...action.items]
        default:
        return state
  }
}
