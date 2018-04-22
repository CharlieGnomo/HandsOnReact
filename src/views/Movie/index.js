import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as movieActions from '../../actions/movieActions'
import * as listActions from '../../actions/listActions'

import DetailsElem from '../../components/DetailsElem';

class Movie extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movie: {},
            list: [],
            col: ''
        }
    }

    componentDidMount(){
        const { movieActions, match } = this.props
        console.log(match.params.id)
        movieActions.loadMovie(match.params.id)
    }

    componentWillReceiveProps({movie, list, match}) {
        const { movieActions } = this.props
        if(match.params.id !== this.props.match.params.id){
            movieActions.loadMovie(match.params.id)
        }
        this.setState({movie, list})
    }

    loadComentarios = e =>{
        const { match,listActions } = this.props
        const col = 'comentarios';
        this.setState({col});
        listActions.loadComments('movie',match.params.id);
    }
    
    loadRecomendados = e => {
        const { match,listActions } = this.props
        const col = 'recomendados';
        this.setState({col});
        listActions.loadItems('movie',match.params.id,'recomendados');
    }

    loadSimilares = e =>{
        const { match,listActions } = this.props
        const col = 'similares';
        this.setState({col});
        listActions.loadItems('movie',match.params.id,'similares');
    }

    commentMovie = e => {
        const com = document.querySelector('#contComment').value;
        const user = document.querySelector('#userComment').value;
        document.querySelector('#userComment').value="";
        document.querySelector('#contComment').value="Añade un comentario";
        const { match,listActions } = this.props
        listActions.comment(match.params.id,com, user, 'movie');
    }

    onBlurComment = e => {
        const com = document.querySelector('#contComment').value;
        const user = document.querySelector('#userComment').value ? document.querySelector('#userComment').value : "DefaultUser";
        const { match } = this.props
        const obj = {mediaId: match.params.id, body: com, collection: 'movie', user: user}
        localStorage.setItem('comentario', obj);
    }

    render() {
        const { movie, list, col } = this.state
        movie.onBlurFunc = this.onBlurComment;
        movie.onClickFunc = this.commentMovie;
        movie.list = list;
        movie.col = col;
        movie.media = "movies";
        movie.similares = this.loadSimilares;
        movie.recomendados = this.loadRecomendados;
        movie.comentarios = this.loadComentarios;
        movie.home = false;
        return (
            
            <DetailsElem {...movie}></DetailsElem>
            
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        movie: state.movie,
        list: state.list
    }
}

function mapDispatchToProps(dispatch){
    return {
        movieActions: bindActionCreators(movieActions, dispatch),
        listActions: bindActionCreators(listActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)

