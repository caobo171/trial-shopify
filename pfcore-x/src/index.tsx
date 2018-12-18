import * as React from "react";
import * as ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import * as axios from 'axios'
import { Hello } from "./components/Hello";

(window as any).axios = axios
ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
