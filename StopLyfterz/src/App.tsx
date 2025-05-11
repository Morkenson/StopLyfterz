import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/AdminPage';
import Business from './pages/BusinessPage';
import AddCard from './components/AddCard';
import EditCard from './components/EditCard';
import AdminVerifyAccount  from './components/AdminVerifyAccount';
import VerifyAccount from './components/VerifyAccount';
import EditableLifterCardList from './components/EditableLifterCardList';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-business-account" element={<VerifyAccount />}/>
              <Route path="/admin" element={<Admin />}>
          {/* ① default view */}
          <Route index element={<EditableLifterCardList  />} />
          

          {/* ② verify‑accounts view */}
          <Route path="verify-accounts" element={<AdminVerifyAccount />} />
        </Route>
              <Route path="/business" element={<Business />} />
              <Route path="/edit-card" element={<EditCard />} />
              <Route path="/business" element={<Business />} />
              
              <Route path="/add-card" element={<AddCard />} />
              
          </Routes>
      </Router>
  );
}

export default App;
