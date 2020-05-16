import http from "./httpService";
function movieURL(id){
    if(id == null)
        return `/movies`;
    return `/movies/${id}`;
}

export function getMovies() {
    return http.get(movieURL(null));
}

export function getMovie(id) {
    return http.get(movieURL(id));
}

export  function saveMovie(movie) {
    if (movie._id) {
        let movieInDb = {...movie};
        //according to vidly-node-backend specification delete(.genre) add(.genreId)
        //Do Not Delete On 'movie' instead of 'movieInDb'
        delete movieInDb._id;
        return http.put(movieURL(movie._id), movieInDb);
    }
    return http.post(movieURL(null), movie);
}

export function deleteMovie(id) {
    return http.delete(movieURL(id));
}