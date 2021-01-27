import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Button, Table, Image } from 'react-bootstrap'
import Axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';

const SearchModal = ({ show, handleClose, searchQuery, onProductChosen, marketplace }) => {

    const [userChosenProduct, setUserChosenProduct] = useState({});

    //popup theke data niye ekhon form e boshaite hobe
    const [currentProductData, setCurrentProductData] = useState({
        productList: undefined,
    });
    useEffect(() => {
        const getProductList = async () => {
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
            handleClose();
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
            <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
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
                            <div>Retrieving data from APIs. Please wait.......</div>
                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={chooseProduct}>Choose</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
};

export default SearchModal;
