import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = (props) => {
    return <Alert variant={props.variant}>{props.message}</Alert>
}

Message.defaultProps = { variant: 'danger', message: 'An error occured' };

export default Message;