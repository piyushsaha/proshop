import React from 'react';
import { Container } from 'react-bootstrap';

// Components
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
	return (
		<>
			<Header />
			<main>
				<Container className='py-3'>
					<h1>ProShop</h1>
				</Container>
			</main>
			<Footer />
		</>
	);
}

export default App;
