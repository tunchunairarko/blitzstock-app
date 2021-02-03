import React, {Fragment,useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import SearchModal from './SearchModal';

export default function SearchModule({setTitle,setRetail,setUpc,setDescription,setImage}) {
    let [show, setShow] = useState(false);
    // const [marketPlace] = useState({
    //     singleItem:true,
    //     getList:false,
    // })

    // const handleCheckBoxChange = (key) =>{
    //     // console.log(marketPlace)
        
    //     marketPlace[key]=!marketPlace[key];
    //     // console.log(marketPlace)
    // }

    const [searchQuery, setSearchQuery] = useState("");
    
    const handleClose = (currentProductData,loaderVisible) => {
        currentProductData.productList=undefined;
        loaderVisible=true;
        if(loaderVisible==true){
            setShow(false);
        }
    };
    const handleShow = () => {setShow(true)};

    
    const handleSearchQuery = (value) => {
        setSearchQuery(searchQuery);
        if(searchQuery){
            handleShow();
        }        
    };
    
    const setUserChosenProductData = (product) =>{
        // console.log("papi")
        // console.log(product)
        setTitle(product.title)
        setRetail(product.price)
        setDescription(product.description)
        setImage(product.image)
        setUpc(product.asinid)
    }


    return (
        <Fragment>
            <Card className="box-design">
                    <Form.Row className="mt-3 pl-2 pr-2">
                        <Form.Group className="pl-2 pr-2 force-100">
                            <InputGroup>
                                <Form.Control
                                    id="searchText"
                                    type="text"
                                    placeholder="Search here.."
                                    onInput={e => setSearchQuery(e.target.value)}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button variant="primary" onClick={() => handleSearchQuery(searchQuery)}>
                                        <FaSearch /> Search
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    {/* <Form.Row className="mt-2 pl-3 pr-3">
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="Get item directly" type={type} id={`inline-${type}-1`} defaultChecked onChange={(e) => handleCheckBoxChange('singleItem')}/>
                                <Form.Check inline label="Search Product List" type={type} id={`inline-${type}-2`} onChange={(e) => handleCheckBoxChange('getList')}/>
                                <Form.Check inline label="Amazon MWS" type={type} id={`inline-${type}-1`} disabled onChange={(e) => handleCheckBoxChange('mws')}/>
                                <Form.Check inline label="Walmart Retail API" type={type} id={`inline-${type}-2`} disabled onChange={(e) => handleCheckBoxChange('walmart')}/> 

                            </div>
                        ))}

                    </Form.Row> */}
                </Card>
                {/* <SearchModal show={show} handleClose={handleClose} searchQuery={searchQuery} onProductChosen={setUserChosenProductData} marketplace={marketPlace}/> */}
                <SearchModal show={show} handleClose={handleClose} searchQuery={searchQuery} onProductChosen={setUserChosenProductData}/>
        </Fragment>
    )
}
