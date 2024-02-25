import React, { useState, useEffect } from 'react';
import { useSocket } from '../../socket/SocketContext';
import { useLocation } from 'react-router-dom';
import Layout from '../Layout/Layout';

const GameRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const socket = useSocket();
  const location = useLocation();
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    if (!socket) return;

    // Event listener for messages received from the backend
    socket.on('message', (data => {
      console.log(data);
      const { sender, content } = data;
      console.log("Sender: ", sender);
      console.log("Content: ", content);
      setMessages((prevMessages) => [...prevMessages, [sender, content].join(': ')]);
    }));

    // Cleanup function to remove event listener when component unmounts
    return () => {
      socket.off('message');
    };
  }, [socket]);

  useEffect(() => {
    const { state } = location;
    const { data } = state;
    console.log(data);
    if (!state) return;
    const { roomId } = data;
    setRoomId(roomId);
  }, [location]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    // Send message to the backend
    socket.emit('sendMessage', {roomId, content: inputValue});
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
        />
        <button style={{ marginLeft: '10px' }} onClick={handleSendMessage}>Send</button>
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
