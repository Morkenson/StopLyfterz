import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/AdminPage';
import Business from './pages/BusinessPage';
import Form from './pages/LyfterForm';
import AddCard from './components/AddCard';



function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/business" element={<Business />} />
              <Route path="/form" element={<Form />} />
              <Route path="/business" element={<Business />} />
              <Route path="/form" element={<AddCard />} />
              <Route path="/add-card" element={<AddCard />} />
          </Routes>
      </Router>
  );
}

export default App;
