import React, { useState, useEffect, useRef } from 'react';
import './PlayerSearch.css';

const PlayerSearch = ({ onPlayerSelect, currentTurn, socket }) => {
  const [inputValue, setInputValue] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8000/player-names')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.playerNames)) {
          setPlayerList(data.playerNames);
        } else {
          console.error('Invalid player list:', data.playerNames);
        }
      })
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  useEffect(() => {
    setIsInputDisabled(currentTurn !== socket.id);
  }, [currentTurn]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length >= 2) {
      const filtered = playerList.filter(player =>
        player.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlayers(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handlePlayerSelect = (playerName) => {
    setInputValue(playerName);
    setShowDropdown(false);
    onPlayerSelect(playerName);
  };

  const handleOutsideClick = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current && dropdownRef.current) {
      dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`;
    }
  }, [filteredPlayers, showDropdown]);

  return (
    <div className="input-container">
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search players..."
            className="input-field"
            disabled={isInputDisabled}
            ref={inputRef}
        />
        {showDropdown && (
            <div className="dropdown" ref={dropdownRef}>
            {filteredPlayers.map((player, index) => (
                <div 
                key={index} 
                onClick={() => handlePlayerSelect(player)}
                className="dropdown-item"
                >
                {player}
                </div>
            ))}
            </div>
        )}
        </div>
  );
};

export default PlayerSearch;
