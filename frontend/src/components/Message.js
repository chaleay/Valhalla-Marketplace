import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

//default variant, in case client does not pass a variant as a prop
Message.defaultProps = {
  variant: 'info',
};

export default Message;
