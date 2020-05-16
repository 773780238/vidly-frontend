import React, {Component} from "react";
import Pagination from "./pagination";
import {paginate} from "../utils/paginate";
import Filter from "./filter";
import {getGenres} from "../services/genreService";
import {deleteMovie, getMovies} from "../services/movieService";
import _ from 'lodash';
import {Link} from "react-router-dom";
import SearchBar from "./searchbar";
import {toast} from "react-toastify";
import {getCurrentUser} from "../services/authService";

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesArray: [],
            selectedGenre: null,
            pageSize: 4,
            currentPage: 1,
            sortColumn: {path: "title", order: "asc"},
            searchWord: "",
            genres: []
        };
    }

    handleSearch = (searchWord) => {
        const selectedGenre = null;
        const currentPage = 1;
        this.setState({searchWord, selectedGenre, currentPage})
    }
    handleHeart = (movie) => {
        const moviesArray = [...this.state.moviesArray];
        const index = moviesArray.indexOf(movie);
        moviesArray[index].liked = !moviesArray[index].liked;
        this.setState({moviesArray});
    }
    handleDelete = async (movie) => {
        const originMovies = this.state.moviesArray;
        const moviesArray = originMovies.filter(m => m._id != movie._id);
        this.setState({moviesArray})

        try {
            await deleteMovie(movie._id);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                toast.error("This movie has already been deleted.")
            }
            this.setState({moviesArray: originMovies})
        }

    }
    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }
    handleFilter = (genre) => {
        const selectedGenre = genre;
        let moviesArray = [...this.state.moviesArray];
        const filteredMoviesArray = moviesArray.filter(movie => movie.genre._id === genre._id);
        this.setState({filteredMoviesArray, selectedGenre, currentPage: 1});
    }
    handleSort = (newSortColumn) => {
        const sortColumn = newSortColumn;
        this.setState({sortColumn});
    }
    modifyData = () => {
        const filteredMoviesArray = this.state.selectedGenre && this.state.selectedGenre._id ? this.state.moviesArray.filter(m => m.genre._id === this.state.selectedGenre._id) : this.state.moviesArray;
        const ordered = _.orderBy(filteredMoviesArray, [this.state.sortColumn.path], [this.state.sortColumn.order]);
        const pageMovies = paginate(ordered, this.state.currentPage, this.state.pageSize);
        const totalCount = filteredMoviesArray.length;
        return {totalCount, ordered, pageMovies};
    }

    render() {
        const {user} = this.props;
        const count = this.state.moviesArray.length;
        //Modify the data
        //filter -> order -> paginate
        const {totalCount, pageMovies} = this.modifyData();
        return (
            <div className="row">
                <div className="col-2">
                    <Filter genres={this.state.genres}
                            onFilter={this.handleFilter}
                            selectedGenre={this.state.selectedGenre}
                    />
                </div>
                <div className="col">


                    {user && <Link to="/movies/new">
                        <button className="btn btn-primary">New Movie</button>
                    </Link>}
                    {count === 0 && <p>There is no movie</p>}
                    {count !== 0 && <p>Showing {totalCount} movies in the database</p>}
                    {<SearchBar name="movieSearch"
                                value={this.state.searchWord}
                                onChange={this.handleSearch}
                                placeholder="Search..."/>}
                    {count !== 0 && <MovieTable movies={pageMovies}
                                                sortColumn={this.state.sortColumn}
                                                onSort={this.handleSort}
                                                onDelete={this.handleDelete}
                                                onHeart={this.handleHeart}/>}
                    {<Pagination
                        itemsCount={totalCount}
                        pageSize={this.state.pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={this.state.currentPage}
                    />}

                </div>
            </div>

        );
    }

    async componentDidMount() {
        const {data: moviesArray} = await getMovies();
        this.setState({moviesArray});
        const {data: promiseGenres} = await getGenres();
        this.setState({genres: [{_id: "", name: "All Genres"}, ...promiseGenres]});
    }
}

class MovieTable extends Component {
    columns = [
        {path: "title", label: "Title", content: (item) => <Link to={"/movies/" + item._id}>{item.title}</Link>},
        {path: "genre.name", label: "Genre"},
        {path: "numberInStock", label: "Stock"},
        {path: "dailyRentalRate", label: "Rate"},
        {
            path: "like", label: "",
            content: item => <Heart movie={item} onHeart={this.props.onHeart}/>
        },
        //holly shit
        {
            path: "delete", label: "",
            content: item => {
                const currentUser = getCurrentUser();
                if (currentUser && currentUser.isAdmin)
                    return <button className="btn btn-danger" onClick={() => this.props.onDelete(item)}>Delete</button>;
                else
                    return null;
            }
        }];

    render() {

        return (
            <>
                <table className="table">
                    <TableHeader onSort={this.props.onSort} columns={this.columns} sortColumn={this.props.sortColumn}/>
                    <TableBody columns={this.columns} data={this.props.movies} onDelete={this.props.onDelete}
                               onHeart={this.props.onHeart}/>
                </table>
            </>);
    }


}

class TableBody extends Component {
    renderCell(column, item) {
        if (column.content)
            return column.content(item);
        else
            return _.get(item, column.path);
    }

    render() {
        return (
            <tbody>
            {this.props.data.map(item =>
                    <tr key={item._id}>
                        {this.props.columns.map(column => <td key={column.path}>{this.renderCell(column, item)}</td>)}
                    </tr>
                //fabulous
            )}
            </tbody>
        );
    }
}

class TableHeader extends Component {
    raiseSort = (path) => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        return sortColumn;
    }
    renderSortIcon = (column) => {
        if (column.path !== this.props.sortColumn.path) return null;
        return this.props.sortColumn.order === 'asc' ? <i className="fa fa-sort-asc"></i> :
            <i className="fa fa-sort-desc"></i>;
    }

    render() {
        const {columns} = this.props;
        return (
            <thead>
            <tr>
                {columns.map(col => <th
                    key={col.path}
                    onClick={() => this.props.onSort(this.raiseSort(col.path))}
                    scope="col">
                    {col.label}{col.label && this.renderSortIcon(col)}
                </th>)}

            </tr>
            </thead>
        );
    }
}

class Heart extends Component {
    render() {
        return (
            this.props.movie.liked ?
                <i onClick={() => this.props.onHeart(this.props.movie)} className="fa fa-heart"></i> :
                <i onClick={() => this.props.onHeart(this.props.movie)} className="fa fa-heart-o"></i>
        );
    }
}

export default Movie;