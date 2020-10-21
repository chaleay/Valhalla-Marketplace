import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

//destructure location from props
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //retrieve userInfo from current redux state (whether or not you are loggin in)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //retrieve userDetails from redux state if available
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  //retrieve success from userUpdateProfile
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  //redirect if already logged in
  useEffect(() => {
    //if user is not logged in
    if (!userInfo) {
      history.push('/login');
    } else {
      //user is logged in, but no profile info currently stored in state, OR succesfully updated user Details (need to reobtain data)
      if (!user || !user.name || success) {
        //reset user update user profile state
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        //update each render cycle?
        dispatch(getUserDetails('profile'));
        //after this dispatch, userDetails now defined!
      } else {
        //if userDetails is defined, no need to retrieve userInfo - safe to use useState hook
        setName(user.name);
        setEmail(user.email);
      }
    } //dependencies is an optional array of dependencies. useEffect() executes callback only when the dependencies have changed between renderings.
  }, [dispatch, history, userInfo, user, success]);

  //handle submission of profile
  const submitHandler = (e) => {
    e.preventDefault();

    //password length verification is done on backend
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      //trim end for whitespace
      setName(name.trimEnd());
      //dispatch put request
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      //window.location.reload();
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>Update Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {success && (
          <Message variant="success">Sucessfully Updated Profile Info.</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Update Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Update Email"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Update password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9} align="center">
        <h1>My Orders</h1>
      </Col>
    </Row>
  );
};

export default ProfileScreen;