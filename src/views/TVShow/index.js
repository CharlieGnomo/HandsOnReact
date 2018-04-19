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
        const user = document.querySelector('#userComment').value;
        document.querySelector('#userComment').value="";
        document.querySelector('#contComment').value="Añade un comentario";
        const { match,listActions } = this.props
        listActions.comment(match.params.id,com,user, 'show');
    }

    onBlurComment = e => {
        const com = document.querySelector('#contComment').value;
        const user = document.querySelector('#userComment').value ? document.querySelector('#userComment').value : "DefaultUser";
        const { match } = this.props
        const obj = {mediaId: match.params.id, body: com, collection: 'show', user: user}
        localStorage.setItem('comentario', obj);
    }

    render() {
        const { show, list, col } = this.state

        return (
            <section className="container main movie" style={{backgroundImage: show.id ? `url(https://image.tmdb.org/t/p/w342/${show.backdrop_path})` : ''}}>
                <div className="overlay"></div>
                <header className="row">
                    <div className="col-12">
                        <h1 style={{color: 'white'}}>{show.id ? show.name : 'Loading...'}</h1>
                        <div className="col-md-6 my-4 float-right">
                            <button className="btn btn-primary" onClick={this.loadSimilares}>Similares</button>
                            <button className="btn btn-primary" onClick={this.loadRecomendados}>Recomendados</button>
                            <button className="btn btn-primary" onClick={this.loadComentarios}>Comentarios</button>
                        </div>
                    </div>
                </header>
                <article className="row movie-item">
                    <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={show.poster_path ? {backgroundImage: `url(https://image.tmdb.org/t/p/w342/${show.poster_path})`}: null}>

                    </footer>
                    
                    <div className="col-md-6 my-4">
                        <header className="w-100">
                            <h1>{show.title}</h1>
                        </header>
                        <p className="d-block">{show.overview}</p>
                    </div>
                    
                </article>
                <article>
                <input type="text" id="userComment" className="form-control" placeholder="Username"></input>
                <textarea id="contComment" className="form-control comentario" defaultValue="Añade un comentario" onBlur={this.onBlurComment}></textarea>
                <button onClick={this.commentShow} className="form-control">Comentar</button>
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

