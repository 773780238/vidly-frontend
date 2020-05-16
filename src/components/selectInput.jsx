import React , { Component }  from "react";
/*** created by Zihui(Eric) Liu 
 May 12 2020 5:15 PM Tuesday 
 zihuiliu@usc.edu           ***/


const SelectInput = ({options, label, name, errorMessage, ...rest}) => {
    return(
        <div className="form-group">
            <label className="mr-sm-2" htmlFor={name}>{label}</label>
            <select {...rest} className="custom-select mr-sm-2" name={name} id={name}>
                <option key="000000" value="">Choose Genre</option>
                {options.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
            </select>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </div>    
    );
}
    
export default SelectInput ;