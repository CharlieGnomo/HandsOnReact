import React from 'react'
import { Link } from 'react-router-dom'

const MediaElem = ({poster_path, id, title, name, overview, link}) => (
    <article 
        className="col-md-3 my-4 movie-item"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${poster_path})`}}
    >
        <div className="overlay">
            <header className="w-100 pt-3 px-3">
                <Link className="d-block" to={`/${link}/${id}`}>{title === undefined ? name : title}</Link>
            </header>
            <p>{overview}</p>
        </div>
    </article>
)

export default MediaElem