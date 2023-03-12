import React, { useState, useEffect } from "react";
import axios from "axios";
import "./teamlist.styles.css";
import { useNavigate } from "react-router-dom";

const TeamList = () => {
  const [playerData, setPlayerData] = useState([]);

  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate("/main-page");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getMatchRegisterDetails")
      .then((response) => {
        setPlayerData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="player-list">
      <div className="team-list-head">
        <h2>Player List</h2>
        <button className="team-list-back-button" onClick={navigateToMainPage}>
          Back
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Date</th>
            <th>Team1</th>
            <th>Team2</th>
          </tr>
        </thead>
        <tbody>
          {playerData.map((player) => (
            <tr key={player.id}>
              <td>{player.place}</td>
              <td>{player.date}</td>
              <td>{player.team1}</td>
              <td>{player.team2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamList;
