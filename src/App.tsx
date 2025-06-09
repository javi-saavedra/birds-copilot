import { Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import BirdsList from '@/components/BirdsList';
import BirdDetails from '@/components/BirdDetails/BirdDetails';

const App = () => {
	return (
		<div className="min-h-screen h-screen flex">
			<Sidebar />
			<main className="flex-1">
				<Routes>
					<Route
						path="/"
						element={<BirdsList />}
					/>
					<Route
						path="/birds/:id"
						element={<BirdDetails />}
					/>
				</Routes>
			</main>
		</div>
	);
};

export default App;
