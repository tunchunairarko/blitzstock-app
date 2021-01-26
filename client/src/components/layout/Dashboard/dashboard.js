import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'

export default function Dashboard() {
    const tokenEmpty = () =>{
        let token = localStorage.getItem("auth-token");
        if(token==""){
            return true; 
        }
        else{
            return false;
        }
    }
    return (
        <Fragment>
            {!tokenEmpty() ? (
                <div>
                    ffff
                </div>
            ):(
                <Redirect to="/login" />
            )}            
        </Fragment>
    )
}
