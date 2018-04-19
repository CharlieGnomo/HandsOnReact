import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as showActions from '../../actions/showActions'
import * as listActions from '../../actions/listActions'

import MediaElem from '../../components/MediaElem'

class TVShow extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            show: {},
            list: [],
            col: ''
        }
    }

    componentDidMount(){
        const { showActions, match } = this.props

        showActions.loadShow(match.params.id)
    }

    componentWillReceiveProps({show, list}) {
        this.setState({show, list})
    }

    loadComentarios = e =>{
        const { match,listActions } = this.props
        const col = 'comentarios';
        this.setState({col});
        listActions.loadComments('show',match.params.id);
    }
    
    loadRecomendados = e => {
        const { match,listActions } = this.props
        const col = 'recomendados';
        this.setState({col});
        listActions.loadItems('tv',match.params.id,'recomendados');
    }

    loadSimilares = e =>{
        const { match,listActions } = this.props
        const col = 'similares';
        this.setState({col});
        listActions.loadItems('tv',match.params.id,'similares');
    }

    commentShow = e => {
        const com = document.querySelector('#contComment').value;
        const { match,listActions } = this.props
        listActions.comment(match.params.id,com, 'show');
    }

    render() {
        const { show, list, col } = this.state

        return (
            <section className="container main movie" style={{backgroundImage: show.id ? `url(https://image.tmdb.org/t/p/w342/${show.backdrop_path})` : ''}}>
                <div className="overlay"></div>
                <header className="row">
                    <div className="col-12">
                        <h1 style={{color: 'white'}}>{show.id ? show.name : 'Loading...'}</h1>
                    </div>
                </header>
                <article className="row movie-item">
                    <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${show.poster_path})`}}>

                    </footer>
                    
                    <div className="col-md-6 my-4">
                        <header className="w-100">
                            <h1>{show.title}</h1>
                        </header>
                        <p className="d-block">{show.overview}</p>
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
                                            <p key={i} className="list-group-item comment">{(i+1)+'.- '+item.body}</p>
                                            
                                        )
                                    }else{
                                        item.link = "shows"
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
                    <textarea id="contComment" className="form-control comentario">Añade un comentario</textarea>
                    <button onClick={this.commentShow} className="form-control">Comentar</button>
                </article>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        show: state.show,
        list: state.list
    }
}

function mapDispatchToProps(dispatch){
    return {
        showActions: bindActionCreators(showActions, dispatch),
        listActions: bindActionCreators(listActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShow)

