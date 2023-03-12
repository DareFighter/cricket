import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../input/input.component";
import "./player-register.styles.css";

const PlayerRegistration = () => {
  const [playerRegistrationData, setPlayerRegistrationData] = useState({
    teamName: "",
    playerName: "",
    playerRole: "",
    playerCountry: "",
  });
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate("/main-page");
  };

  const handleChangePlayerRegistrationData = (e) => {
    setPlayerRegistrationData({
      ...playerRegistrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPlayerRegistrationData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/playerRegisterDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playerRegistrationData),
        }
      );
      const data = await response.json();
      alert("Player added successfully");
      setPlayerRegistrationData({
        teamName: "",
        playerName: "",
        playerRole: "",
        playerCountry: "",
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container  player-registration-container">
      <div className="row w-50">
        <div className="player-registration-title">
          <h2>Player Registration </h2>
        </div>
        <form onSubmit={handleSubmitPlayerRegistrationData}>
          <Input
            name={`teamName`}
            value={playerRegistrationData.teamName}
            changeHandler={handleChangePlayerRegistrationData}
            type={`text`}
            placeholderName={`Enter Team Name`}
          />
          <br />
          <Input
            name={"playerName"}
            value={playerRegistrationData.playerName}
            changeHandler={handleChangePlayerRegistrationData}
            type={"text"}
            placeholderName={`Enter Player Name`}
          />
          <br />
          <Input
            name={`playerRole`}
            value={playerRegistrationData.playerRole}
            changeHandler={handleChangePlayerRegistrationData}
            type={"text"}
            placeholderName={`Enter Player Role`}
          />
          <br />
          <Input
            name={`playerCountry`}
            value={playerRegistrationData.playerCountry}
            changeHandler={handleChangePlayerRegistrationData}
            type={"text"}
            placeholderName={`Enter Player Country`}
          />

          <div className="player-registration-buttons">
            <button className="player-registration-button" type="submit">
              Submit
            </button>
            <button
              className="player-registration-navigate"
              onClick={navigateToMain}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerRegistration;
