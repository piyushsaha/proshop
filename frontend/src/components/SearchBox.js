import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search?keyword=${keyword}`);
        }
    }

    return <Form onSubmit={submitHandler} className='d-flex my-2'>
        <Form.Control
            type='text'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search products...'
            className='mr-sm-2 ml-sm-5'
        />
        <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
}

export default SearchBox;
