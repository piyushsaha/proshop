import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

// Redux actions
import { getUserDetails } from '../redux/actions/userActions';


const UserEditScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.userDetails);
    
    const userID = props.match.params.id;
    
    useEffect(() => {
        // If the user details is not loaded or a different user's details is loaded
        if(!user || user._id !== userID) {
            dispatch(getUserDetails(userID));
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, user, getUserDetails]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        // UPDATE USER FUNCTIONALITY HERE
    }
    return <>
    {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <>
            <Button onClick={props.history.goBack} className='btn btn-light my-3'>Go back </Button>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin' className='my-3'>
                    <Form.Check
                        checked={isAdmin}
                        label="Administrator privileges"
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                </Form.Group>
                <Button type='submit' className='btn'>Update</Button>
            </Form>
            </>
        )}
    </>
}

export default UserEditScreen;