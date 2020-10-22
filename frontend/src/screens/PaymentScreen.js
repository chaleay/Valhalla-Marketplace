import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
//error with module can be ignored for now
import Message from '../components/Message';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //if no shipping address provided, redirect to shipping
  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const [message] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeOrder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step2 step3 />
      <h1>Payment Method</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              //unique identifier for this checkbox
              id="Paypal"
              //value by which we reference this in JS
              name="paymentMethod"
              //value of this checkbox
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              //unique identifier for this checkbox
              id="Stripe"
              //value by which we reference this in JS
              name="paymentMethod"
              //value of this checkbox
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Col>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Col>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
