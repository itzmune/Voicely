import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Therapy from './pages/Therapy';
import './App.css';

function App() {
  const [userId] = useState('user1'); // In a real app, this would come from auth
  
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/therapy">Therapy Session</Link></li>
          </ul>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Dashboard userId={userId} />} />
            <Route path="/therapy" element={<Therapy userId={userId} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;