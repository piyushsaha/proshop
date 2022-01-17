import React from 'react';
import { Container } from 'react-bootstrap';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Screens
import HomeScreen from './screens/HomeScreen';

const App = () => {
	return (
		<>
			<Header />
			<main>
				<Container className='py-3'>
					<HomeScreen />
				</Container>
			</main>
			<Footer />
		</>
	);
}

export default App;
