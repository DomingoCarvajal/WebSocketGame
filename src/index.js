// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';

import GameRoom from './components/GameRoom/GameRoom';
import reportWebVitals from './reportWebVitals';
import { SocketProvider } from './socket/SocketContext';
import './index.css';
import WaitingRoom from "./pages/WaitingRoom/WaitingRoom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/game-room" element={<GameRoom />} /> 
          <Route path="/waiting-room" element={<WaitingRoom />} />
        </Routes>
      </Router>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

