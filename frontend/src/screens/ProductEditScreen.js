import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

// Redux actions
import { singleProduct, updateProduct } from '../redux/actions/productActions';

const ProductEditScreen = (props) => {
    console.log(props.match.params.id);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);
    
    // const { loading:updateLoading, error:updateError, success:updateSuccess } = useSelector(state => state.userUpdate);
    // States to handle when to show and hide success message of updation
    // const [isSuccess, setIsSuccess] = useState(updateSuccess);
    
    const productID = props.match.params.id;
    
    const { loading: loadingUpdate, error:errorUpdate, success: successUpdate } = useSelector(state => state.productUpdate);
    const [isUpdateError, setIsUpdateError] = useState(errorUpdate);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(successUpdate);
    
    useEffect(() => {
        // If the product details is not loaded or a different product's details is loaded
        if(!product || product._id !== productID) {
            dispatch(singleProduct(productID));
        }
        else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }        
    }, [dispatch, product, productID]);
    
    useEffect(() => {
        if(successUpdate) {
            setIsUpdateSuccess(true);
            dispatch({ type: 'PRODUCT_UPDATE_RESET' });
            setTimeout(() => setIsUpdateSuccess(false), 5000);
        }
        if(errorUpdate) {
            setIsUpdateError(true);
            dispatch({ type: 'PRODUCT_UPDATE_RESET' });
            setTimeout(() => setIsUpdateError(false), 5000);
        }
    }, [dispatch, successUpdate, errorUpdate]);
    
    // useEffect(() => {
    //     // If updated successfully
    //     if(updateSuccess) {
    //         // Set isSuccess to true to show message 
    //         setIsSuccess(true);
    //         // Hiding the success message after 5s
    //         setTimeout(() => setIsSuccess(false), 5000);
    //         // Reset update status in state
    //         dispatch({ type: 'USER_UPDATE_RESET' });
    //     }
    // }, []);
    
    const submitHandler = (e) => {
        e.preventDefault();
        // UPDATE PRODUCT FUNCTIONALITY HERE
        dispatch(updateProduct({
            _id: product._id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }));
    }
    const fileUploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await axios.post('/api/upload', formData, config);
            setImage(res.data);
            setUploading(false);
        }
        catch(error) {
            console.error(error);
            setUploading(false);
        }
    }
    
    return <>
    {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <>
            <Button onClick={props.history.goBack} className='btn btn-light my-3'>Go back </Button>
            {/* {isSuccess && <Message variant='success' message='Updated' />} */}
            {isUpdateSuccess && <Message variant='success' message='Updated'/>}
            {isUpdateError && <Message variant='danger' message={errorUpdate}/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.Control
                        type='file'
                        id='image-file'
                        label='Upload Product Image'
                        custom
                        onChange={fileUploadHandler}
                    ></Form.Control>
                    {uploading && <LoadingSpinner />}
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='text'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='countinstock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type='number'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='sescription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {loadingUpdate && <LoadingSpinner />}
                <Button type='submit' className='btn'>Update</Button>
            </Form>
            </>
        )}
    </>
}

export default ProductEditScreen;