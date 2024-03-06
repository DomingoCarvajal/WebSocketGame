import React from 'react';
import './PlayerTeamsBlock.css';

const PlayerTeamsBlock = ({ playerName, teams }) => {
  return (
    <div className="player-teams-block">
      <div className="player-info">
        <div className="player-name">{playerName}</div>
      </div>
      <div className="teams">
        {Object.entries(teams).map(([teamName, playCount]) => (
            <div key={teamName} className="team-name">
            {teamName} x {playCount}
            </div>
        ))}
     </div>

    </div>
  );
};

export default PlayerTeamsBlock;


