import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProducts,
  deleteProductAdmin,
  createProductAdmin,
} from '../actions/productActions';
import { Link } from 'react-router-dom';
import { PRODUCT_ADMIN_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [createMessage, setCreateMessage] = useState(null);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productAdminDelete = useSelector((state) => state.productAdminDelete);
  const {
    success: productDeleteSuccess,
    error: errorDelete,
    loading: loadingDelete,
  } = productAdminDelete;

  const productAdminCreate = useSelector((state) => state.productAdminCreate);
  const {
    success: productCreateSuccess,
    error: errorCreate,
    loading: loadingCreate,
  } = productAdminCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    } else {
      dispatch(listProducts());
    }

    dispatch({ type: PRODUCT_ADMIN_CREATE_RESET });
  }, [dispatch, history, userInfo, productDeleteSuccess, productCreateSuccess]);

  const createProductHandler = () => {
    dispatch(createProductAdmin());
    setCreateMessage('Product created successfully');
  };

  const deleteHandler = (id) => {
    if (window.confirm(`Are you sure you want to delete this product?`)) {
      dispatch(deleteProductAdmin(id));
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Manage Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            variant="success"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {createMessage && <Message variant="success">{createMessage}</Message>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingDelete ? (
        <Loader />
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm"
          style={{ backgroundColor: '#c3e8e7' }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <Link
                    style={{ color: '#15590b' }}
                    to={`/product/${product._id}`}
                  >
                    {product.name}
                  </Link>
                </td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td align="center">
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="dark" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
