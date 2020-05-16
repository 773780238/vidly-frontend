import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Movie from "./movie";
import Rental from "./rental";
import Customer from "./customer";
import NotFound from "./notfound";
import MovieDetail from "./moviedetail";
import NavBar from "./navbar";
import LoginForm from "./loginform";
import Register from "./register";
import {ToastContainer} from "react-toastify"
import ProtectedRoute from "../common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./logout";
import {getCurrentUser} from "../services/authService";
class App extends Component {
    state = {}
    componentDidMount() {
        const user = getCurrentUser();
        this.setState({user});
    }

    render() {
        return (
            <div className="container">
                <NavBar user={this.state.user}/>
                <ToastContainer/>
                <Switch>
                    <Route path={"/logout"} component={Logout}/>

                    <Route path="/register" component={Register}></Route>
                    <Route path="/login" component={LoginForm}></Route>
                    <ProtectedRoute path="/movies/:id" component={MovieDetail}/>
                    <Route path="/movies" render={props => <Movie  {...props} user={this.state.user}/> }/>
                    <Route path="/customers" component={Customer}/>
                    <Route path="/rentals" component={Rental}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect from="/" to="/movies" exact/>
                    <Redirect to="/not-found"/>
                </Switch>
            </div>
        );
    }
}

export default App;