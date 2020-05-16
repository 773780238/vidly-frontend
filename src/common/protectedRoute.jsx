import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import MovieDetail from "../components/moviedetail";
import {getCurrentUser} from "../services/authService";

/*** created by Zihui(Eric) Liu
 May 13 2020 7:20 AM Wednesday
 zihuiliu@usc.edu           ***/



const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
    return (
        <Route  {...rest}
                render={
                    props => {
                        if (!getCurrentUser()) return <Redirect to={{
                            pathname:"/login",
                            state:{from:props.location},
                        }}/>;
                        return Component ? <Component {...props}/> : render(props);
                    }
                }/>
    );
}

export default ProtectedRoute;