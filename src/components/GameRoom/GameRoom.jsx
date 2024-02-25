import React, { useState, useEffect } from 'react';
import { useSocket } from '../../socket/SocketContext';
import { useLocation } from 'react-router-dom';
import Layout from '../Layout/Layout';

const GameRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || currentTurn !== socket.id) return; // Check if it's the user's turn
    socket.emit('sendMessage', { roomId, content: inputValue });
    setInputValue('');
  };

  return (
    <Layout>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={currentTurn !== socket.id} // Disable input if it's not the user's turn
        />
        <button
          style={{ marginLeft: '10px' }}
          onClick={handleSendMessage}
          disabled={currentTurn !== socket.id} // Disable button if it's not the user's turn
        >
          Send
        </button>
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
