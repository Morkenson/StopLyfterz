import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/AdminPage';
import Business from './pages/BusinessPage';
import Form from './pages/LyfterForm';

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
          </Routes>
      </Router>
  );
}

export default App;
