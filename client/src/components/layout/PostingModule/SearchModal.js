import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Button, Row, Image } from 'react-bootstrap'
import Axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import Loader from 'react-loader-spinner';
import "../../../components/assets/style.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const SearchModal = ({ show, handleClose, searchQuery, onProductChosen, marketplace }) => {

    const [userChosenProduct, setUserChosenProduct] = useState({});
    const [loaderVisible, setLoaderVisible] = useState(true);
    //popup theke data niye ekhon form e boshaite hobe
    const [currentProductData, setCurrentProductData] = useState({
        productList: undefined,
    });
    // useDidMount(()=>{
    //     // setCurrentProductData({productList:undefined});
    //     setLoaderVisible(true);
    //     console.log(loaderVisible);
    // })
    useEffect(() => {
        const getProductList = async () => {            
            if(!currentProductData.productList){
                setLoaderVisible(true)
                if (searchQuery) {
                    console.log(searchQuery)
                    let token = localStorage.getItem("auth-token");
                    if (token == null) {
                        localStorage.setItem("auth-token", "");
                        token = "";
                    }
                    else {
                        const tokenResponse = await Axios.post(
                            "/api/users/tokenIsValid",
                            null,
                            { headers: { "x-auth-token": token } }
                        );
                        // console.log(searchQuery)
                        
                        if (tokenResponse.data) {
                            const body = { searchQuery, marketplace };
                            const productRes = await Axios.post(
                                "/api/products/productlist", 
                                body
                            );
                            setCurrentProductData({
                                productList: productRes.data,
                            });
                            setLoaderVisible(false);
                        }
    
                    }
                }
            }
        }
        getProductList();
    }, [show])

    const chooseProduct = async (e) => {
        e.preventDefault();
        if (userChosenProduct) {
            onProductChosen(userChosenProduct)
            // setCurrentProductData(undefined)
            // setLoaderVisible(true);
            // console.log("Ku")
            // console.log(currentProductData)
            handleClose(currentProductData,loaderVisible);
        }
    }

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) =>{setUserChosenProduct(currentProductData.productList[rowIndex])},
        style: (row, rowIndex) => {
          const backgroundColor = rowIndex > 1 ? '#00BFFF' : '#00FFFF';
          return { backgroundColor };
        }
      };

      const columns=[
        {
            dataField: 'image',
            text: 'Image',
            formatter:imageFormatter
        },
        {
            dataField: 'asinid',
            text: 'UPC/ASIN'
        },
        {
            dataField: 'title',
            text: 'Title'
        },
        {
            dataField: 'price',
            text: 'Price'
        },
        {
            dataField: 'source',
            text: 'Source'
        }
    ]
    function imageFormatter(cell, row){
        return (<Image src={cell} fluid/>) ;
      }
      
    return (
        <Fragment>
            <Modal size="lg" show={show} onHide={(e)=>handleClose(currentProductData,loaderVisible)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="searchResTitle">Search result for {searchQuery}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentProductData.productList ? (
                        <BootstrapTable
                        keyField='asinid'
                        data={ currentProductData.productList }
                        columns={ columns }
                        selectRow={ selectRow }
                        wrapperClasses="table-responsive"
                        rowClasses="text-nowrap"
                        
                      />
                    ) : (
                        
                        <Row className="justify-content-md-center">
                            <Loader
                            className="searchLoader"
                            type="TailSpin"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            visible={loaderVisible} />
                        </Row>                        
        
                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=>handleClose(currentProductData,loaderVisible)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={chooseProduct}>Choose</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
};

export default SearchModal;
