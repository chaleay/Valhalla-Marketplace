import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
//error with module can be ignored for now
import CountrySelect from 'react-bootstrap-country-select';
import Message from '../components/Message';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [addressTwo, setAddressTwo] = useState(shippingAddress.addressTwo);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [region, setRegion] = useState(shippingAddress.region);
  const [country, setCountry] = useState(shippingAddress.country || null);
  const [message, setMessage] = useState(null);

  //retrieve userLogin information from the current state (see store.js)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!country) {
      setMessage('You must select a valid country');
    } else {
      dispatch(
        //passing in an object with all these parameters needed for successful shipping
        saveShippingAddress({
          address,
          addressTwo,
          city,
          postalCode,
          region,
          country,
        })
      );
      history.push('/payment');
    }
  };

  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=shipping`);
  }, [country, history, userInfo]);

  return (
    <FormContainer>
      \<CheckoutSteps step2 />
      <h1>Shipping</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            placeholder="Enter address"
            //this line below changes the value of address according to this inputs value
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            type="text"
            value={addressTwo}
            placeholder="Enter Address 2"
            //this line below changes the value of address according to this inputs value
            onChange={(e) => setAddressTwo(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            placeholder="Enter city"
            //this line below changes the value of address according to this inputs value
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="region">
          <Form.Label>State / Region</Form.Label>
          <Form.Control
            type="text"
            value={region}
            placeholder="Enter state / region"
            //this line below changes the value of address according to this inputs value
            onChange={(e) => setRegion(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            value={postalCode}
            placeholder="Enter Postal Code"
            //this line below changes the value of address according to this inputs value
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <CountrySelect
            flush={false}
            value={country}
            onChange={(e) => setCountry(e)}
            required
          ></CountrySelect>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
