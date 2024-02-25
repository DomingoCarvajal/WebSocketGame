import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../socket/SocketContext';
import Layout from '../../components/Layout/Layout';

const WaitingRoom = () => {
  const [waitingMessage, setWaitingMessage] = useState('');
  const [isFindingGame, setIsFindingGame] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off('gameStarted');
      }
    };
  }, [socket]);

  const handleFindGame = () => {
    if (socket) {
      setIsFindingGame(true);
      socket.emit('joinGame');
      setWaitingMessage('Finding game...');
      socket.on('gameStarted', (data) => {
        setIsFindingGame(false);
        setWaitingMessage('Game found! Redirecting to game...');
        setTimeout(() => {
          navigate('/game-room', { state: { data } });
        }, 2000);
      });
    }
  };

  const handleCancel = () => {
    if (socket) {
      setIsFindingGame(false);
      setWaitingMessage('Cancelled');
      socket.emit('cancelGame');
    }
  };

  return (
    <Layout>
      <div className="waiting-room">
        <h1>Waiting Room</h1>
        {!isFindingGame && (
          <button onClick={handleFindGame}>Find Game</button>
        )}
        {isFindingGame && (
          <button onClick={handleCancel}>Cancel</button>
        )}
        <p>{waitingMessage}</p>
      </div>
    </Layout>
  );
};

export default WaitingRoom;



