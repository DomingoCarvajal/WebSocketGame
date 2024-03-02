import React from 'react';
import PlayerSearch from '../PlayerSearch/PlayerSearch';

const AutoComplete = ({ onPlayerSelect, currentTurn, socket }) => {
  return (
    <div>
      <PlayerSearch onPlayerSelect={onPlayerSelect} currentTurn={currentTurn} socket={socket} />
    </div>
  );
};

export default AutoComplete;
