import React, { useContext, useState, Fragment, useEffect } from 'react'
import PrivateRoute from "../../../router/PrivateRoute";
import Aside from '../Aside/Aside';
import 'react-pro-sidebar/dist/css/styles.css';
import {  FaBars } from 'react-icons/fa';
import '../../assets/Dashboard.scss';
import PostingModule from '../PostingModule/postingModule';
import Dashboard from '../Dashboard/dashboard';
import { Switch, Route } from "react-router";

export default function Admin() {
    
    const [collapsed, setCollapsed] = useState(false);

    const [toggled, setToggled] = useState(false);


    const handleToggleSidebar = (value) => {
        setToggled(value);
    };
    
    return (
        <Fragment>
            
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
                                <PrivateRoute component={PostingModule} path="/posting"  />
                                <PrivateRoute component={Dashboard} path="/" />
                            </Switch>
                        </div>
                    </main>
                </div>

            )
        </Fragment>
    )
}
