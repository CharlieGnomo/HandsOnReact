import React from 'react'

import MediaElem from './../MediaElem'



const DetailsElem = ({id,backdrop_path, title, poster_path,  overview, onBlurFunc, onClickFunc, similares, recomendados, comentarios, list, col, media, home}) => {
    return(
        <section className="container main movie" style={{backgroundImage: id ? `url(https://image.tmdb.org/t/p/w342/${backdrop_path})` : ''}}>
                <div className="overlay"></div>
                <header className="row">
                    <div className="col-12">
                        <h1 style={{color: 'white'}}>{id ? title : 'Loading...'}</h1>
                        {(!home) && (<div className="col-md-6 my-4 float-right">
                            <button className="btn btn-primary" onClick={similares}>Similares</button>
                            <button className="btn btn-primary" onClick={recomendados}>Recomendados</button>
                            <button className="btn btn-primary" onClick={comentarios}>Comentarios</button>
                        </div>) }
                        
                    </div>
                </header>
                <article className="row movie-item">
                    <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={poster_path ? {backgroundImage: `url(https://image.tmdb.org/t/p/w342/${poster_path})`}: null}>

                    </footer>
                    
                    <div className="col-md-6 my-4">
                        <header className="w-100">
                            <h1>{title}</h1>
                        </header>
                        <p className="d-block">{overview}</p>
                    </div>
                    
                    
                </article>
                {(!home) && (<article>
                <input type="text" id="userComment" className="form-control" placeholder="Username"></input>
                <textarea id="contComment" className="form-control comentario" defaultValue="Añade un comentario" onBlur={onBlurFunc}></textarea>
                <button onClick={onClickFunc} className="form-control">Comentar</button>
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
                                        item.link = media
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
                    
                </article>)}
                
            </section>
)
}

export default DetailsElem