import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import JobSearch from './pages/JobSearch';
import JobDetails from './pages/JobDetails';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recherche" element={<JobSearch />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          {/* Add more routes here as needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

