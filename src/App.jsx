
import React, { useState } from 'react';

import './App.css';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageJoueur1 from './pages/pageJoueur1';
import PageJoueur2 from './pages/pageJoueur2';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<>
            <div>
              <Link to="/PageJoueur1">Create New Game</Link>
            </div>
            <div>
              <Link to="/PageJoueur2">Join Game</Link>
            </div>

          </>} />
          <Route exact path="/PageJoueur1" element={<PageJoueur1 />} />
          <Route exact path="/PageJoueur2" element={<PageJoueur2 />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
