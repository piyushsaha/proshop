import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = (props) => {
    return <Helmet>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
        <meta name='keywords' content={props.keywords} />
    </Helmet>
}

Meta.defaultProps = {
    title: 'ProShop',
    description: 'ProShop - The best electronics e-commerce website',
    keywords: 'electronics, gadgets, buy electronics, mobile, smartphone, accessories'  
};

export default Meta;