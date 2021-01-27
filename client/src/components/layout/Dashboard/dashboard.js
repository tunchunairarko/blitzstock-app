import React, { Fragment } from 'react'
import { useCookies } from "react-cookie";

export default function Dashboard() {
    const [cookies, setCookie] = useCookies(["user"]);
    return (
        <Fragment>
            
                <div>
                    Welcome {cookies.username}
                </div>
                       
        </Fragment>
    )
}
