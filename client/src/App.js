import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from './components/layout/Header/header'
import Admin from './components/layout/Admin/Admin'

import Login from './components/auth/login'
import Register from './components/auth/register'
import UserContext from "./context/UserContext";
import { useDidMount } from "react-hooks-lib";
import { useHistory } from "react-router-dom";

import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from './router/PublicRoute';



//"exact property fixes the issue of the Route component to skip looking for child paths"
export default function App() {
    const [userData, setUserData] = useState ({
        token: undefined,
        user: undefined,
    });
    
    let history = useHistory();
    
    useDidMount(() =>{
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            // console.log(token)
            if(token==null){
                localStorage.setItem("auth-token","");
                token="";
                // history.push("/login");
            }
            else{
                var tokenError=false;
                const newLocal = { headers: { "x-auth-token": token } };
                const tokenResponse = await Axios.post(
                    `/api/users/tokenIsValid`,
                    null,
                    newLocal
                ).catch(function(error){
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                        tokenError=true;   
                      } 
                    //   else if (error.request) {
                    //     // The request was made but no response was received
                    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    //     // http.ClientRequest in node.js
                    //     console.log(error.request);
                    //   } else {
                    //     // Something happened in setting up the request that triggered an Error
                    //     console.log('Error', error.message);
                    //   }
                    //   console.log(error.config);
                })
                if(tokenError){
                    setUserData({
                        token:undefined,
                        user:undefined
                      });
                    localStorage.setItem("auth-token","");
                      
                    // history.push("/login");
                    // logout();
                }
                // console.log(tokenResponse)
                else{
                    if(tokenResponse.data){
                        const userRes = await Axios.get(
                            `/api/users/`,{headers:{"x-auth-token":token}},
                        )
                        setUserData({
                            token,
                            user: userRes.data,
                        });
                    }
                }
                
            }
        }
        checkLoggedIn();
    });

    return (
        <Fragment>
            <BrowserRouter>
                <UserContext.Provider value={{ userData,setUserData }}>                    
                    {!userData.user ? <Header /> : <div></div>}
                    <Switch>
                        <PublicRoute restricted={true} component={Login} path="/login" exact />
                        <PublicRoute restricted={true} component={Register} path="/login" exact />
                        <PrivateRoute component={Admin} path="/dashboard" exact />
                        <PrivateRoute component={Admin} path="/posting" exact />
                        <PublicRoute restricted={true} component={Admin} path="/" exact />
                        
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
        </Fragment>
        
    );
}
