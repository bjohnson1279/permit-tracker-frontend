// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PermitList from './components/PermitList';
import AddPermitForm from './components/AddPermitForm';
import PermitDetail from './components/PermitDetail';
import EditPermitForm from './components/EditPermitForm';
import './App.css'; // For basic styling, if needed

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Permit Tracker</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">View Permits</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add New Permit</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<PermitList />} />
            <Route path="/add" element={<AddPermitForm />} />
            <Route path="/permit/:id" element={<PermitDetail />} />
            <Route path="/edit/:id" element={<EditPermitForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
