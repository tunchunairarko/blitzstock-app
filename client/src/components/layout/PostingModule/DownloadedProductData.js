import React, { Fragment,useState,useContext } from 'react'
import {  Form,  Row, Col, Button,  Card, ButtonGroup, Dropdown } from 'react-bootstrap'
import { FaBroom, FaDumpsterFire, FaUpload } from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../../../components/assets/style.css";
import Axios from "axios";
import UserContext from "../../../context/UserContext";
import ErrorNotice from "../../misc/ErrorNotice";
import SuccessNotice from "../../misc/SuccessNotice";



export default function DownloadedProductData({title,upc,description,retail,image,setTitle,setRetail,setUpc,setDescription,setImage}) {
    const { userData } = useContext(UserContext);
    const [error, setError] = useState();
    const [successNotice, setSuccessNotice] = useState();
    const [quantity, setQuantity]=useState(1);
    const [discount, setDiscount]=useState(50);
    const [condition,setCondition]=useState('New');

    const handleSelect=(e)=>{
        console.log(e);
        setCondition(e)
      }
    const increaseQuantity =() =>{
        setQuantity(quantity+1);
    }
    const decreaseQuantity =() =>{
        if(quantity!==1){
            setQuantity(quantity-1);
        }
    }

    const clearAll = () =>{
        setTitle("")
        setUpc("")
        setRetail("")
        setDescription("")
        setImage("https://cdn.shopify.com/s/files/1/0514/3520/8854/files/surplus-auction.png?v=1609197903")
        setDiscount("50")
        setQuantity("1")
        setCondition("New")

    }
    const postProduct = async(e) =>{
        e.preventDefault()
        try{
            if(title==="" || retail==="" || quantity==="" || image==="" || discount===""){
                setError("Please fill up all the missing fields")
            }
            else{
                const res = await Axios.get(`/api/products/getsku`,{headers:{"x-auth-token":userData.token}});
                var discounted_price=parseFloat(retail)*parseInt(discount)/100;
                // console.log(res.data)
                if(res.data){
                    var sku=res.data;
                    const product={
                        title:title,
                        upc:upc,
                        sku:sku,
                        description:description,
                        image:image,
                        retail:retail.toString(),
                        condition:condition,
                        discounted_price:discounted_price.toString(),
                        quantity:quantity,
                        categories:[]
                    }
                    console.log(product)
                    const username=userData.user.username;
                    const productInp = product;
                    const data={  username,  productInp }    
                    console.log(data)
                    const resp = await Axios.post(`/api/products/new`,data,{headers:{"x-auth-token":userData.token}});
                    const result=resp.data
                    try{
                        setSuccessNotice("Product uploaded successfully. Posting id: "+result.product.id+". SKU: "+sku);
                        clearAll();
                    }catch(err){
                        setError("Error in posting product")
                    }
                }

            }
        }
        catch(err){
            console.log(err)
            // err.response.data.msg && setError(err.response.data.msg);
        }
    }


    return (
        <Fragment>
            {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
            {successNotice && (
                        <SuccessNotice message={successNotice} clearSuccessNotice={() => setSuccessNotice(undefined)} />
                    )}
            <Card className="box-design mt-3">
                <Row className="ml-3 pr-3 mt-3">
                    <Col xs={12} sm={4} >
                        <Card className="productImageBox">
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                {/* <Card.Title></Card.Title>
                                <Card.Text></Card.Text> */}
                                <Button variant="primary" block><FaUpload /> Upload manually</Button>
                                <Button variant="danger" block><FaDumpsterFire /> Clear photo</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Form>
                            <Form.Group as={Row} controlId="titleText">
                                <Form.Label column sm="2">
                                    Title
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="upcText">
                                <Form.Label column sm="2">
                                    UPC/ASIN
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Enter UPC/Asin" value={upc} onChange={(e)=>setUpc(e.target.value)}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="priceText">
                                <Form.Label column sm="2">
                                    Retail
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Enter Retail" value={retail} onChange={(e)=>setRetail(e.target.value)}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    Discount
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control placeholder="Enter Discount" value={discount} onChange={(e)=>setDiscount(e.target.value)}/>
                                </Col>
                                <Form.Label column sm="2">
                                    Qty
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control placeholder="Enter Qty" value={quantity} onChange={(e)=>setDiscount(e.target.value)}/>
                                </Col>
                                <Col sm="2">
                                    <ButtonGroup id="qtyButtonGroup" aria-label="Basic example">
                                        <Button variant="outline-danger" className="qtyButton" onClick={increaseQuantity}>+</Button>
                                        <Button variant="outline-danger" className="qtyButton" onClick={decreaseQuantity}>-</Button>
                                    </ButtonGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Condition
                                </Form.Label>
                                <Col sm="4">
                                    <Dropdown onSelect={handleSelect}>
                                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" block >
                                            {condition}
                                        </Dropdown.Toggle >

                                        <Dropdown.Menu >
                                            <Dropdown.Item eventKey="New">New</Dropdown.Item>
                                            <Dropdown.Item eventKey="Like New">Like New</Dropdown.Item>
                                            <Dropdown.Item eventKey="Opened Box">Opened Box</Dropdown.Item>
                                            <Dropdown.Item eventKey="Damaged Box">Damaged Box</Dropdown.Item>
                                            <Dropdown.Item eventKey="Uninspected Returns">Uninspected Returns</Dropdown.Item>
                                            <Dropdown.Item eventKey="Salvage">Salvage</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Form.Label column sm="2">
                                    Categories
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control placeholder="Separate by comma (,)" disabled/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Description
                                </Form.Label>
                                <Col sm="10">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data= {description}
                                        config={{
                                            removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']
                                        }}
                                        // onReady={editor => {
                                        //     // You can store the "editor" and use when it is needed.
                                        //     console.log('Editor is ready to use!', editor);
                                        // }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data);
                                            // console.log({ event, editor, data });
                                        }}
                                        // onBlur={(event, editor) => {
                                        //     console.log('Blur.', editor);
                                        // }}
                                        // onFocus={(event, editor) => {
                                        //     console.log('Focus.', editor);
                                        // }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="6" className="mt-2">
                                    <Button variant="success" block onClick={postProduct}><FaUpload /> Post Product </Button>
                                </Col>
                                <Col sm="6" className="mt-2">
                                    <Button variant="danger" block onClick={clearAll}><FaBroom /> Clear All </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Card>
                                            
        </Fragment>
    )
}
