import React, {useState, useEffect} from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from './components/layout/Header/header'
import Admin from './components/layout/Admin/Admin'

import Login from './components/auth/login'
import Register from './components/auth/register'
import UserContext from "./context/UserContext";

//import { useHistory } from "react-router-dom";


//"exact property fixes the issue of the Route component to skip looking for child paths"
export default function App() {
    const [userData, setUserData] = useState ({
        token: undefined,
        user: undefined,
    });
    // const history = useHistory();
    
    useEffect(() =>{
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            // console.log(token)
            if(token==null){
                localStorage.setItem("auth-token","");
                token="";
                history.push("/login");
            }
            else{
                const tokenResponse = await Axios.post(
                    `/api/users/tokenIsValid`,
                    null,
                    {headers:{"x-auth-token":token}}
                );
                // console.log(tokenResponse.data)
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
        checkLoggedIn();
    }, []);

    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={{ userData,setUserData }}>                    
                    {!userData.user ? <Header /> : <div></div>}
                    <Switch>
                        <Route exact path="/" component={Admin}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/posting" component={Admin}></Route>
                        <Route path="/dashboard" component={Admin}></Route>
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
        </>
        
    );
}
