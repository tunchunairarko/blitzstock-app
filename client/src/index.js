import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/assets/style.css'
import { CookiesProvider } from "react-cookie";

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.querySelector("#root"));
