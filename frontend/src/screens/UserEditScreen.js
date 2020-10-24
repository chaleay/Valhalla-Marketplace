import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';

//destructure location from props
const UserEditScreen = ({ location, history, match }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //retrieve userLogin information from the current state (see store.js)
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  //return the quertstring part of the url, and then select the first param
  const redirect = location.search ? location.search.split('=')[1] : '/';

  //redirect if already logged in
  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage('Succesfully updated');
  };

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Admin | Update User Info</h1>
        {message && <Message variant="danger">{message}</Message>}
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
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Label>Is Admin </Form.Label>
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button type="submit" variant="primary" block>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
