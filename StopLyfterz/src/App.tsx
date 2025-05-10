import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/AdminPage';
import Business from './pages/BusinessPage';
import AddCard from './components/AddCard';
import EditCard from './components/EditCard';
import VerifyAccount from './components/VerifyAccount';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/business" element={<Business />} />
              <Route path="/edit-card" element={<EditCard />} />
              <Route path="/business" element={<Business />} />
              
              <Route path="/add-card" element={<AddCard />} />
              <Route path="/verify-account" element={<VerifyAccount />} />
          </Routes>
      </Router>
  );
}

export default App;
