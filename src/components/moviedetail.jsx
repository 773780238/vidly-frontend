import React, {Component} from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import {getGenres} from "../services/genreService";
import {saveMovie, getMovie} from "../services/movieService";
import {toast} from "react-toastify";

class MovieDetail extends Form {
    state = {
        data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: ""},
        errors: {},
        genres: []
    }
    schema = {
        _id: Joi.string().allow("").optional().label("Id"),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(5).label("Rate"),

    }

    async populateGenres() {
        const {data: promiseGenres} = await getGenres();
        this.setState({genres: [...promiseGenres]});
    }

     populationMovie = async () => {
        try {
            const {match} = this.props;

            if(match.params.id === "new") return ;
            const {data: movie} = await getMovie(match.params.id);
            console.log("get: ",movie);
            const {genre} = movie;
            this.setState({
                data: {
                    _id:movie._id,
                    title:movie.title,
                    numberInStock:movie.numberInStock,
                    dailyRentalRate:movie.dailyRentalRate,
                    genreId:  movie.genre._id,
                }
            });
        } catch (e) {
            if (e.response && e.response.status === 404) this.props.history.replace("/not-found");
        }
    }

     componentDidMount() {
        this.populateGenres();
        this.populationMovie();
    }


    async onSubmit() {
        try{
            await saveMovie(this.state.data);
            const {history} = this.props;
            history.push('/movies');
        }catch(e){
            toast.error(e.response.data);
        }
        console.log("Saved");
    }

    render() {
        return (
            <div>
                <h1>MovieDetail</h1>
                {this.renderInput("title", "Title")}
                {this.renderSelectInput("genreId", "Genre", this.state.genres)}
                {this.renderInput("numberInStock", "Number in Stock")}
                {this.renderInput("dailyRentalRate", "Rate")}
                {this.renderButton("Save")}
            </div>
        );
    }

}

export default MovieDetail;