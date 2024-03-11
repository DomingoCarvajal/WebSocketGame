import React, { useState, useEffect, useRef } from 'react';
import { getPlayers } from '../../requests/apiQueries';
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
    const fetchPlayerNames = async () => {
      try {
        const data = await getPlayers();
        if (Array.isArray(data.players)) {
          setPlayerList(data.players);
        } else {
          console.error('Invalid player list:', data.players);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
  
    fetchPlayerNames();
  }, []);

  useEffect(() => {
    setIsInputDisabled(currentTurn !== socket.id);
  }, [currentTurn]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length >= 2) {
      const filtered = playerList.filter(player =>
        (player.playerName.toLowerCase() + ' ').includes(value.toLowerCase())
      );
      setFilteredPlayers(filtered); // Show only the first 5 suggestions
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const handlePlayerSelect = (player) => {
    setInputValue(player.playerName);
    setShowDropdown(false);
    onPlayerSelect(player);
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
              {player.playerName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;
