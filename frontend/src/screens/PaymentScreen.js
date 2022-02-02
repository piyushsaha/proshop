import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/UI/FormContainer';

// Redux actions
import { savePaymentMethod } from '../redux/actions/cartActions';

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress) {
        props.history.push('/shipping');
    }
    
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    
    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    
                    {/* More payment options */}
                    {/* <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    /> */}
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-3'>Continue</Button>
        </Form>
    </FormContainer>
}

export default ProductScreen;