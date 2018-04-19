import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import movies from './moviesReducer'
import movie from './movieReducer'
import shows from './showsReducer'
import show from './showReducer'
import list from './listReducer'

const rootReducer = combineReducers({
    movies, 
    movie,
    shows,
    show,
    list,
    router: routerReducer
})

export default rootReducer
