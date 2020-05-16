import React, {Component} from "react";

/*** created by Zihui(Eric) Liu
 May 12 2020 8:50 PM Tuesday
 zihuiliu@usc.edu           ***/

//controlled component
const SearchBar = ({onChange,...rest}) => {

    return (
        <div className="form-group">
            <input className="form-control"
                   type="text"
                   onChange={e => onChange(e.currentTarget.value)}
                   {...rest}/>
        </div>
    );
}


export default SearchBar;