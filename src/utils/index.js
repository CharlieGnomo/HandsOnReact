export const moviesURL = {
    upcoming: page => {
        return `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    topRated: page => {
        return `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    popular: page => {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    }
}

export const showsURL = {
/*     upcoming: page => {
        return `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    }, */
    topRated: page => {
        return `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    popular: page => {
        return `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    }
}

export const listURL = {
        comentarios: (col,id) => {
            const c = col ==='movie' ? 'movieId':'showId'
            return `http://localhost:3010/comments?${c}=${id}`
        },
        similares: (col,id) => {
            console.log(`https://api.themoviedb.org/3/${col}/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
            return `https://api.themoviedb.org/3/${col}/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        },
        recomendados: (col,id) => {
            return `https://api.themoviedb.org/3/${col}/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        }
    }