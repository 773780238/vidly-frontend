import React , { Component }  from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as registerService from "../services/registerService";
import {loginWithJWT} from "../services/authService";
/*** created by Zihui(Eric) Liu 
 May 12 2020 4:53 PM Tuesday 
 zihuiliu@usc.edu           ***/


class Register extends Form {
    state={
        data: {username:"", password:"", name:""},
        errors: {}
    }
    schema={
        username:Joi.string().email().required().label("Username"),
        password:Joi.string().required().min(5).label("Password"),
        name:Joi.string().required().label("Name")
    }
    async onSubmit(){
        try{
            const response = await registerService.register(this.state.data);
            loginWithJWT(response.headers["x-auth-token"])
            window.location = "/";
        }catch(e){
            if(e.response && e.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({errors});
            }
        }

    }
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password","password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>

        );
    }
}
    

    
export default Register ;