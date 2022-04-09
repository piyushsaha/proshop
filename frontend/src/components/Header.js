import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Redux action
import { logout } from '../redux/actions/userActions';

// Components
import SearchBox from './SearchBox';

const Header = () => {
    const userLogin = useSelector(state => state.userLogin);
    const dispatch = useDispatch();
    const { userInfo } = userLogin;
    
    const logoutHandler = () => {
        dispatch(logout());
    }
    
    return <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <SearchBox />
                    <Nav className='ml-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className='fas fa-shopping-cart'></i> Cart
                            </Nav.Link>
                        </LinkContainer>
                        
                        {/* Rendering dropdown or sign in option based on whether user is logged in or not */}
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                       Profile 
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                            <Nav.Link>
                                <i className='fas fa-user'></i> Sign In
                            </Nav.Link>
                        </LinkContainer>
                        )}
                        
                        {/* Rendering admin menu based on whether logged in user is admin or not */}
                        {userInfo && userInfo.isAdmin ? (
                            <NavDropdown title='Admin Menu' id='admin'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>
                                       Users
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>
                                       Products
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>
                                       Orders
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) : (
                            <></>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
}

export default Header;