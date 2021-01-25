import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Button, Table, Image } from 'react-bootstrap'
import Axios from "axios";

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
                        `/api/users/tokenIsValid`,
                        null,
                        { headers: { "x-auth-token": token } }
                    );
                    // console.log(searchQuery)
                    
                    if (tokenResponse.data) {
                        const body = { searchQuery, marketplace }
                        const productRes = await Axios.post(
                            `/api/products/productList`, body, { headers: { "x-auth-token": token }, timeout:300 }
                        )
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



    return (
        <Fragment>
            <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="searchResTitle">Search result for {searchQuery}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentProductData.productList ? (
                        <Table className="searchModalTable" striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>UPC/ASIN</th>
                                    <th>Title</th>
                                    <th>Retail</th>
                                    <th>Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: currentProductData.productList.length }).map((_, index) => (
                                    <tr value={index} onClick={(e) => setUserChosenProduct(currentProductData.productList[index])}>
                                        <td >{index + 1}</td>
                                        <td><Image className="searchModalImage" src={currentProductData.productList[index].image} thumbnail fluid /></td>
                                        <td>{currentProductData.productList[index].asinid}</td>
                                        <td className="searchModalTitle">{currentProductData.productList[index].title}</td>
                                        <td>{currentProductData.productList[index].price}</td>
                                        <td>{currentProductData.productList[index].source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
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
