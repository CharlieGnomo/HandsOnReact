import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import logo from '../../images/logo.svg'

import * as searchActions from '../../actions/searchActions'

class Header extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            numberOfMovies: props.numberOfMovies,
            results: []
        }
    }

    componentDidMount() {
        const{ searchActions } = this.props;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            numberOfMovies: nextProps.numberOfMovies,
            results: nextProps.results
        })
    }

    onSearch = e => {
        const text = document.querySelector('#searchBox').value;
        const{ searchActions } = this.props;
        searchActions.loadSearch(text);
    }

    render() {
        const { numberOfMovies, results } = this.state
        return (
            <div className="row">
            <header className="main-nav d-flex col-12" style={{flexDirection: 'column'}}>
                <div className="logo-wrapper d-flex">
                    <img src={logo} alt="TMDB"/>
                    {numberOfMovies > 0 && <h1 style={{color: 'white'}}>{numberOfMovies}</h1>}
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to={`/movies`}>Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/shows`}>TV Shows</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="float-right flexStyle">
                        <input type="text" id="searchBox" className="form-control" placeholder="search"></input>
                        <button type="button" id="searchBtn" onClick={this.onSearch} className="btn btn-primary">Search</button>
                    </div>
                </nav>
            </header>
            <div>
                {results.length > 0 ? results.map((res) => {
                    return (<img className="img-thumbnail" src={'https://image.tmdb.org/t/p/w342/'+res.poster_path}/>)
                }) : null}
            </div>
        </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        numberOfMovies: state.movies.length,
        results: state.search
    }
}

function mapDispatchToProps(dispatch){
    return {
        searchActions: bindActionCreators(searchActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)