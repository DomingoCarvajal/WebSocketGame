import React, { useState, useEffect } from 'react';
import { useSocket } from '../../socket/SocketContext';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import AutoComplete from '../../components/AutoComplete/AutoComplete';

const GameRoom = () => {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [currentTurn, setCurrentTurn] = useState('');
  const socket = useSocket();
  const location = useLocation();

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (data) => {
      const { sender, content, turn } = data;
      setMessages((prevMessages) => [...prevMessages, [sender, content].join(': ')]);
      setCurrentTurn(turn);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  useEffect(() => {
    const { state } = location;
    if (state) {
      const { data } = state;
      const { roomId, turn } = data;
      setRoomId(roomId);
      setCurrentTurn(turn);
    }
  }, [location]);

  const handlePlayerSelect = (playerName) => {
    if (currentTurn !== socket.id) return; // Check if it's the user's turn
    socket.emit('sendMessage', { roomId, content: playerName });
  };

  return (
    <Layout>
      <div>
        <AutoComplete onPlayerSelect={handlePlayerSelect} currentTurn={currentTurn} socket={socket} />
      </div>
      <div>
        <h2>Chat</h2>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GameRoom;
