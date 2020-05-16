import React from 'react';
import ReactDom from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import {BrowserRouter} from "react-router-dom";
import * as Sentry from "@sentry/browser";
import App from "./components/app";
Sentry.init({dsn: "https://42d6233754734645a5b371bc9a118d2c@o391873.ingest.sentry.io/5238559"});
ReactDom.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById("root"));
