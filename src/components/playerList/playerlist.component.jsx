import React, { useState, useEffect } from "react";
import axios from "axios";
import "./playerlist.styles.css";
import { useNavigate } from "react-router-dom";

const PlayerList = () => {
  const [playerData, setPlayerData] = useState([]);

  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate("/main-page");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/playerRegisterDetails")
      .then((response) => {
        setPlayerData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="player-list">
      <div className="player-list-head">
        <h2>Player List</h2>
        <button
          className="player-list-back-button"
          onClick={navigateToMainPage}
        >
          Back
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Player Name</th>
            <th>Player Role</th>
            <th>Player Country</th>
          </tr>
        </thead>
        <tbody>
          {playerData.map((player) => (
            <tr key={player.id}>
              <td>{player.teamName}</td>
              <td>{player.playerName}</td>
              <td>{player.playerRole}</td>
              <td>{player.playerCountry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
