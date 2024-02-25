import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useSocket } from '../../socket/SocketContext';
import Layout from '../../components/Layout/Layout';

const WaitingRoom = () => {
  const [waitingMessage, setWaitingMessage] = useState('');
  const socket = useSocket();
  const navigate = useNavigate();

  const handleFindGame = () => {
    if (socket) {
      socket.emit('joinGame');
      setWaitingMessage('Finding game...');
      socket.on('gameStarted', (data) => {
        setWaitingMessage('Game found! Redirecting to game...');
        setTimeout(() => {
          navigate('/game-room', { state: { data } });
        }, 2000); // Change the timeout as needed
      });
    }
  };

  return (
    <Layout>
      <div className="waiting-room">
        <h1>Waiting Room</h1>
        <button onClick={handleFindGame}>Find Game</button>
        <p>{waitingMessage}</p>
      </div>
    </Layout>
  );
};

export default WaitingRoom;


