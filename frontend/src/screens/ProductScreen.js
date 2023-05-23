import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductScreen =()=> {
    const {id} = useParams()
    const[product,setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async() => {
            const { data } = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }
        fetchProduct()
    },[])
    
   
    return (
    <>
    <Link className='btn btn-light my-3' to='/'>
        Go Back
    </Link>    
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name}/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating 
                    value={product.rating} 
                    text={`${product.numReviews} reviews`}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    description: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col>
        <ListGroup varient='flush'>
            <ListGroup.Item>
                <Row>
                    <Col>
                    price:
                    </Col>
                    <Col>
                    <strong>${product.price}</strong>
                    </Col>
                </Row>
            </ListGroup.Item>
            
            <ListGroup.Item>
                <Row>
                    <Col>
                    status:
                    </Col>
                    <Col>
                    {product.countInStock > 0 ? 'in stock' : 'out of stock'}
                    </Col>
                </Row>
            </ListGroup.Item>
           
           <ListGroup.Item>
            <button 
            className='btn-block'
            type='button'
            disabled={product.countInStock===0}
            >Add to cart</button>
           </ListGroup.Item>

        </ListGroup>
        </Col>
    </Row>
    
    
    </>
    )
}
export default ProductScreen