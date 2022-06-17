import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProducListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import SearchResultScreen from './screens/SearchResultScreen';

// React Router scroll reset
import ScrollToTop from './components/util/ScrollToTop';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Container className='py-3'>
					<ScrollToTop />
					<Switch>
						<Route path="/" component={HomeScreen} exact />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/login" component={LoginScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/orders/:id" component={OrderScreen} />
						<Route path="/admin/userlist" exact component={UserListScreen} />
						<Route path="/users/:id/edit" component={UserEditScreen} />
						<Route path="/admin/productlist" exact component={ProducListScreen} />
						<Route path="/products/:id/edit" component={ProductEditScreen} />
						<Route path="/admin/orderlist" exact component={OrderListScreen} />
						<Route path="/search" component={SearchResultScreen} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
