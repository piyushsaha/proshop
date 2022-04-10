import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Meta from '../components/Meta';

// Redux actions
import { getUsers, deleteUser } from '../redux/actions/userActions';

const UserListScreen = (props) => {
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.usersList);
    const { loading, error, users } = usersList;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(getUsers());
        }
        else {
            props.history.push('/login');
        }
    }, [dispatch]);
    
    const userDeleteHandler = async (id) => {
        if(window.confirm('Are you sure want to delete this user?')) {
            await dispatch(deleteUser(id));
            dispatch(getUsers());
        }
    }
    
    return <>
        <Meta title='Users List' />
        <h1>Users</h1>
        {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                { user.isAdmin ?
                                (<i className='fas fa-check' style={{ color: 'green' }} />) 
                                :
                                (<i className='fas fa-times' style={{ color: 'red' }} />) }
                            </td>
                            <td>
                                <LinkContainer to={`/users/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'><i className='fas fa-edit' /></Button>
                                </LinkContainer>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={userDeleteHandler.bind(null, user._id)}
                                    disabled={user.isAdmin}
                                >
                                    <i className='fas fa-trash' />
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        )}
    </>
}

export default UserListScreen;