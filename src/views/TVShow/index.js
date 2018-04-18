import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as showActions from '../../actions/showActions'

class TVShow extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            show: {}
        }
    }

    componentDidMount(){
        const { showActions, match } = this.props

        showActions.loadShow(match.params.id)
    }

    componentWillReceiveProps({show}) {
        this.setState({show})
    }

    loadComentarios(){

    }
    
    loadRecomendados(){

    }

    loadSimilares(){

    }

    render() {
        const { show } = this.state

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
                    <button onClick={this.loadSimilares}>Similares</button>
                    <button onClick={this.loadRecomendados}>Recomendados</button>
                    <button onClick={this.loadComentarios}>Comentarios</button>
                    <div className="col-md-6 my-4">
                        <header className="w-100">
                            <h1>{show.title}</h1>
                        </header>
                        <p className="d-block">{show.overview}</p>
                    </div>
                </article>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        show: state.show
    }
}

function mapDispatchToProps(dispatch){
    return {
        showActions: bindActionCreators(showActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShow)

