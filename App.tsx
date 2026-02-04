import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Offer from './Offer';
import Privacy from './Privacy';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{color: 'white', padding: '50px', fontSize: '30px'}}>ПРОВЕРКА СВЯЗИ: ГЛАВНАЯ РАБОТАЕТ</div>} />
        <Route path="/home-test" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
};

export default App;
