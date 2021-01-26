import React, { useContext, useState, Fragment, useEffect } from 'react'
import UserContext from "../../../context/UserContext";
import { Redirect } from 'react-router-dom';
import Aside from '../Aside/Aside';
import 'react-pro-sidebar/dist/css/styles.css';
import {  FaBars } from 'react-icons/fa';
import '../../assets/Dashboard.scss';
import PostingModule from '../PostingModule/postingModule';
import Dashboard from '../Dashboard/dashboard';
import { Switch, Route } from "react-router";

export default function Admin() {
    
    const { userData } = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false);

    const [toggled, setToggled] = useState(false);


    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

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
                <div id="content-body" className={`app  ${toggled ? 'toggled' : ''}`}>
                    <Aside
                        collapsed={collapsed}
                        toggled={toggled}
                        handleToggleSidebar={handleToggleSidebar}
                    />
                    <main>
                        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                            <FaBars />
                        </div>
                        <div className="container-fluid">
                            <Switch>
                                <Route path={'/posting'}><PostingModule /></Route>
                                <Route path={'/'}><Dashboard /></Route>
                            </Switch>
                        </div>
                    </main>
                </div>

            ) : (                    
                <Redirect to="/login" />
            )}
        </Fragment>
    )
}
