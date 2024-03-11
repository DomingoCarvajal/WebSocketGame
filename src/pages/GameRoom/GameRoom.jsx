import React, { useState, useEffect } from 'react';
import { useSocket } from '../../socket/SocketContext';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import PlayerTeamsBlock from '../../components/PlayerTeamsBlock/PlayerTeamsBlock';
import Timer from '../../components/Timer/Timer'; // Import the Timer component
import './GameRoom.css';

const GameRoom = () => {
  const [playerInfo, setPlayerInfo] = useState([]); // Store player names and their teams
  const [roomId, setRoomId] = useState('');
  const [currentTurn, setCurrentTurn] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [timerReset, setTimerReset] = useState(true); // State to reset the timer
  const socket = useSocket();
  const location = useLocation();

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (data) => {
      const { content, turn, teams, status } = data;
      console.log('Message received:', data);
      if (status === 'ValidPlay') {
        setPlayerInfo((prevPlayerInfo) => [...prevPlayerInfo, { playerName: content, teams }]);
        setErrorMessage('');
        setTimerReset(prevTimerReset => !prevTimerReset);
      } else if (status === 'InvalidPlay') {
        setErrorMessage(`${content}`);
      } else if (status === 'GameOver') {
        setErrorMessage(content);
      }

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
      const { roomId, turn, startingPlayer } = data;
      setRoomId(roomId);
      setCurrentTurn(turn);
      setPlayerInfo([{ playerName: startingPlayer, teams: [] }]);
    }
  }, [location]);

  const handlePlayerSelect = (player) => {
    if (currentTurn !== socket.id) return; // Check if it's the user's turn
    socket.emit('sendMessage', { roomId, content: player});
  };


  return (
    <Layout>
      <div className="game-room-container">
        <div className='auto-complete-input'>
          <AutoComplete
            onPlayerSelect={handlePlayerSelect}
            currentTurn={currentTurn}
            socket={socket}
          />
        </div>
        <div className='timer'>
          <Timer
            reset={timerReset}
          />
        </div>
      </div>
      {errorMessage && ( // Render error message if exists
        <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>
      )}
      <div>
        <div>
          {playerInfo.slice(0).reverse().map((info, index) => (
            <PlayerTeamsBlock key={index} playerName={info.playerName} teams={info.teams} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GameRoom;

