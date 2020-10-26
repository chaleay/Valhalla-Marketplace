import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import {
  listProductDetails,
  updateProductAdmin,
} from '../actions/productActions';
import { PRODUCT_ADMIN_UPDATE_RESET } from '../constants/productConstants';

//destructure location from props
const ProductEditScreen = ({ match }) => {
  //TODO: useproduct, productId logged in as admin cannot set themselves at not admin while logged on

  const productId = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  //retrieve userLogin information from the current state (see store.js)
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: productUpdateLoading,
    error: productUpdateError,
    success: productUpdateSuccess,
  } = productUpdate;

  //redirect if already logged in
  useEffect(() => {
    if (productUpdateSuccess) {
      dispatch({ type: PRODUCT_ADMIN_UPDATE_RESET });
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, productUpdateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAdmin({
        id: productId,
        name,
        image,
        price,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <Link to="/admin/productList" className="btn btn-light my-3">
          Go Back
        </Link>
        <h1 align="center">Admin | Edit Product</h1>
        {productUpdateLoading && <Loader />}
        {productUpdateError && (
          <Message variant="danger">{productUpdateError}</Message>
        )}
        {message && <Message variant="success">{message}</Message>}
        {loading ? (
          <Loader></Loader>
        ) : (
          error && <Message variant="danger">{error}</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              placeholder="Enter Price"
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              value={countInStock}
              placeholder="Enter Count In Stock"
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form.Group>

          <Button type="submit" variant="primary" block>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
