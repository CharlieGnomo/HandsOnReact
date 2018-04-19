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

        return (
            <section className="container main movie" style={{backgroundImage: movie.id ? `url(https://image.tmdb.org/t/p/w342/${movie.backdrop_path})` : ''}}>
                <div className="overlay"></div>
                <header className="row">
                    <div className="col-12">
                        <h1 style={{color: 'white'}}>{movie.id ? movie.title : 'Loading...'}</h1>
                        <div className="col-md-6 my-4 float-right">
                            <button className="btn btn-primary" onClick={this.loadSimilares}>Similares</button>
                            <button className="btn btn-primary" onClick={this.loadRecomendados}>Recomendados</button>
                            <button className="btn btn-primary" onClick={this.loadComentarios}>Comentarios</button>
                        </div>
                    </div>
                </header>
                <article className="row movie-item">
                    <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={movie.poster_path ? {backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})`}: null}>

                    </footer>
                    
                    <div className="col-md-6 my-4">
                        <header className="w-100">
                            <h1>{movie.title}</h1>
                        </header>
                        <p className="d-block">{movie.overview}</p>
                    </div>
                    
                    
                </article>
                <article>
                <input type="text" id="userComment" className="form-control" placeholder="Username"></input>
                <textarea id="contComment" className="form-control comentario" defaultValue="Añade un comentario" onBlur={this.onBlurComment}></textarea>
                <button onClick={this.commentMovie} className="form-control">Comentar</button>
                <h2 className="titleSection">{col}</h2>
                <div className="row movie-list-wrapper sectionCont">
                        {
                            (list) ? 
                                list.map((item, i) => {
                                    if(col==='comentarios'){
                                        return(
                                            <div key={i} className="list-group-item comment">
                                                <p><span className="badge badge-primary">{(i+1)}</span><span className="userStyle">{item.user}</span></p>
                                                <p>{item.body}</p>
                                            </div>
                                            
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

