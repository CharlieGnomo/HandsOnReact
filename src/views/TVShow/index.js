import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as showActions from '../../actions/showActions'
import * as listActions from '../../actions/listActions'

import DetailsElem from '../../components/DetailsElem';

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

    componentWillReceiveProps({show, list, match}) {
        const { showActions } = this.props
        if(match.params.id !== this.props.match.params.id){
            showActions.loadShow(match.params.id)
        }
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
        show.onBlurFunc = this.onBlurComment;
        show.onClickFunc = this.commentShow;
        show.list = list;
        show.col = col;
        show.media = "shows";
        show.similares = this.loadSimilares;
        show.recomendados = this.loadRecomendados;
        show.comentarios = this.loadComentarios;
        show.home = false;
        return (
            <DetailsElem {...show}></DetailsElem>
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

