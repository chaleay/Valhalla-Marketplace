import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {
  //useState hook - first param in array is what we cwant to call this piece of state,
  //and then what we call to manipulate this state / set the state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      //destructure - originally returns data
      //calls the /api/products route and gets that json data from backend
      //await keyword makes the promise settle and return its result
      const { data } = await axios.get('/api/products');
      //setproducts equal to the data that we get from backend
      setProducts(data);
    };

    //after the function has been declared above, run it
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
