import React, {Component} from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as authService from "../services/authService";
import {getCurrentUser} from "../services/authService";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";

/*** created by Zihui(Eric) Liu
 May 12 2020 7:53 AM Tuesday
 zihuiliu@usc.edu           ***/

class LoginForm extends Form {
    state={
        data: {username:"", password:""},
        errors: {}
    }
    schema={
        username:Joi.string().required().label("Username"),
        password:Joi.string().required().label("Password"),
    }
    async onSubmit(){
        try{
            await authService.login(this.state.data);
            const {state} = this.props.location;
            window.location = state ? state.from.pathname : "/";
        }catch(e){
            if(e.response && e.response.status === 400){
                toast.error(e.response.data);
            }
        }

    }
    render() {
        if(getCurrentUser())return <Redirect to="/"/>;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password","password")}
                    {this.renderButton("Login")}
                </form>
            </div>

        );
    }
}


export default LoginForm;