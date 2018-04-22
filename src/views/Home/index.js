import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as movieActions from '../../actions/movieActions'

import DetailsElem from '../../components/DetailsElem';

class Home extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movie: {},
        }
    }

    componentDidMount(){
        const { movieActions } = this.props

        movieActions.loadRandomMovie()

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.movie.title !==  this.state.movie.title) {
            this.setState({
                movie: nextProps.movie
            })
        }
    }

    render () {
        const { movie } = this.state
        movie.home = true;
        return (
            <DetailsElem {...movie}></DetailsElem>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        movie: state.movie
    }
}

function mapDispatchToProps(dispatch){
    return {
        movieActions: bindActionCreators(movieActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

