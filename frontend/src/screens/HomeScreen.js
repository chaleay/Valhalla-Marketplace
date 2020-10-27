import React, { useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = ({ match }) => {
  //useState hook - first param in array is what we cwant to call this piece of state,
  //and then what we call to manipulate this state / set the state
  //const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  //retrieve list of all products from state in store file
  const productList = useSelector((state) => state.productList);
  //destructure - retreive elements from the state
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
