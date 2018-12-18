import * as React from "react";
import axios from 'axios'

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => {

    axios.get('/api').then(data=>console.log(data))
    return(
      <h1>Hello from {props.compiler} and {props.framework}!</h1>
    )
    
};