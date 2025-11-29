import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import GameCreate from './components/GameCreate';
import GameUpdate from './components/GameUpdate';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<GameList />} />
          <Route path="/detail/:id" element={<GameDetail />} />
          <Route path="/create" element={<GameCreate />} />
          <Route path="/update/:id" element={<GameUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
