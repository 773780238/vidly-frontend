import React, {Component} from "react";
import {logout} from "../services/authService";

/*** created by Zihui(Eric) Liu
 May 13 2020 6:16 AM Wednesday
 zihuiliu@usc.edu           ***/

class Logout extends Component {
    componentDidMount() {
       logout();
       window.location = "/";
    }

    render() {
        return null;
    }
}

export default Logout;