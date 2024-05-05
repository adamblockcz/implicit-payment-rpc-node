// External imports
import { Routes, Route } from 'react-router-dom';

// Local imports
import HomePage from '../pages/Navbar';
import Login from '../pages/Login';
import { Home } from '@mui/icons-material';

// Component definition
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="login" element={< Login/>} />
    </Routes>
  );
}

// Default export
export default App;