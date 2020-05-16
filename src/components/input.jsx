import React, {Component} from "react";

/*** created by Zihui(Eric) Liu
 May 12 2020 2:26 PM Tuesday
 zihuiliu@usc.edu           ***/




const Input = ({name, label, errorMessage, ...rest}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input  {...rest} name={name}
                    id={name} className="form-control"/>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </div>
    );
}

export default Input;