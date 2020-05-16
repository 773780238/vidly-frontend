import React , { Component }  from "react";
import Joi from "joi-browser";
import Input from "../components/input";
import SelectInput from "../components/selectInput";
/*** created by Zihui(Eric) Liu 
 May 12 2020 3:36 PM Tuesday 
 zihuiliu@usc.edu           ***/

/*** customizedForm that extends Form MUST have state likes {data:{} , errors:{}}***/
class Form extends Component {

    renderSelectInput = (name,label,options) =>{
        return <SelectInput name={name}
                            label={label}
                            value={this.state.data[name]}
                            onChange={this.handleChange}
                            errorMessage={this.state.errors[name]}
                            options={options}/>
    }
    renderButton = (label) =>{
        return(
            <button
                disabled={Object.keys(this.state.errors).length !== 0}
                className="btn btn-primary"
                onClick={this.handleSubmit}>{label}</button>
        );
    }
    renderInput = (name, label, type = "text") => {
        return <Input name={name}
                      type={type}
                      label={label}
                      value={this.state.data[name]}
                      onChange={this.handleChange}
                      errorMessage={this.state.errors[name]}/>
    }
    validate = () =>{
        const {error} = Joi.validate(this.state.data, this.schema, {abortEarly : false});
        if(!error) return {};
        const errors ={};
        for(let item of error.details)errors[item.path[0]] = item.message;
        return errors;
    }
    handleSubmit =  (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors});
        this.onSubmit();
    }


    validateProperty = ({name,value}) =>{
        const obj = {[name]:value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const data = {...this.state.data};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        data[input.name] = input.value;
        this.setState({data, errors});
    }

}
    

export default Form ;