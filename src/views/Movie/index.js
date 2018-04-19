import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as movieActions from '../../actions/movieActions'
import * as listActions from '../../actions/listActions'

import MediaElem from '../../components/MediaElem'

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

        movieActions.loadMovie(match.params.id)
    }

    componentWillReceiveProps({movie, list}) {
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

    render() {
        const { movie, list, col } = this.state

        return (
            <section className="container main movie" style={{backgroundImage: movie.id ? `url(https://image.tmdb.org/t/p/w342/${movie.backdrop_path})` : ''}}>
                <div className="overlay"></div>
                <header className="row">
                    <div className="col-12">
                        <h1 style={{color: 'white'}}>{movie.id ? movie.title : 'Loading...'}</h1>
                    </div>
                </header>
                <article className="row movie-item">
                    <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})`}}>

                    </footer>
                    
                    <div className="col-md-6 my-4">
                        <header className="w-100">
                            <h1>{movie.title}</h1>
                        </header>
                        <p className="d-block">{movie.overview}</p>
                    </div>
                    <div className="col-md-6 my-4">
                    <button onClick={this.loadSimilares}>Similares</button>
                    <button onClick={this.loadRecomendados}>Recomendados</button>
                    <button onClick={this.loadComentarios}>Comentarios</button>
                    </div>
                    
                </article>
                <article>
                <div className="row movie-list-wrapper">
                        {
                            (list) ? 
                                list.map((item, i) => {
                                    if(col==='comentarios'){
                                        return(
                                            <p key={i} className="list-group-item">{item.body}</p>
                                            
                                        )
                                    }else{
                                        item.link = "movies"
                                        return (
                                            <MediaElem
                                                key={i}
                                                {...item}
                                            />
                                        )}
                                    }
                                
                                ) : null
                        }
                    </div>
                    <textarea className="form-control comentario">Añade un comentario</textarea>
                </article>
            </section>
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

