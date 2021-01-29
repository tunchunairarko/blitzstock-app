import React, { Fragment, useContext, useEffect, useState } from 'react'

import {CardDeck} from 'react-bootstrap'
import "../../../components/assets/style.css";

import ModuleHeader from "../ModuleHeader/ModuleHeader";
import Total from "../../assets/sigma.png";
import Best from "../../assets/server.png";
import Upload from "../../assets/upload.png";
import DashCard from "./DashCard";


export default function Dashboard() {
    
    return (
        <Fragment>
            <ModuleHeader moduleName={"Dashboard"}/>

            <CardDeck >
                <DashCard title={"User upload"} value={"50"} image={Upload} />
                <DashCard title={"Total upload"} value={"150"} image={Total} />
                <DashCard title={"Best uploader"} value={"admin"} image={Best} />                
                
            </CardDeck>
        </Fragment>
    )
}
