import React, { useContext,Fragment, useState } from 'react'
import '../../assets/style.css';
import UserContext from "../../../context/UserContext";
import DownloadedProductData from './DownloadedProductData';
import SearchModule from './SearchModule';
import { Redirect } from 'react-router-dom';
// import Dummy from '../../assets/dummy-prod.png';


export default function PostingModule() {

    const { userData } = useContext(UserContext);
    const [title,setTitle] = useState("");
    const [upc,setUpc] = useState("");
    const [retail,setRetail] = useState("");
    const [image,setImage] = useState("https://cdn.shopify.com/s/files/1/0514/3520/8854/files/surplus-auction.png?v=1609197903");
    const [description,setDescription] = useState("<p>Enter your description here</p>");
    
    return (
        <Fragment>
            {userData.user ? (
                <div>
                <h1 className="moduleTitle">Product Posting Module</h1>
                <SearchModule setTitle={setTitle} setRetail={setRetail} setUpc={setUpc} setDescription={setDescription} setImage={setImage}/>
                {/* Later on I will add context here */}
                <DownloadedProductData 
                title={title}
                upc={upc}
                retail={retail}
                image={image}
                description={description}
                setTitle={setTitle} setRetail={setRetail} setUpc={setUpc} setDescription={setDescription} setImage={setImage}
                />
            </div>
            ) :(
                <Redirect to="/login" />
            )}
            
        </Fragment >
    )
}
