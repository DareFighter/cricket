import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../input/input.component";
import "./teamRegister.styles.css";

const TeamRegister = () => {
  const [teamRegisterData, setTeamRegisterData] = useState({
    place: "",
    date: "",
    team1: "",
    team2: "",
  });

  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate("/main-page");
  };

  const handleChangeTeamRegisterData = (e) => {
    setTeamRegisterData({
      ...teamRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitTeamRegisterData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/postMatchRegisterDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teamRegisterData),
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Match registered succefully");
      setTeamRegisterData({
        place: "",
        date: "",
        team1: "",
        team2: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container team-register-container">
      <div className="row w-50">
        <div className="team-register-title">
          <h2>Match Registration</h2>
        </div>
        <form onSubmit={handleSubmitTeamRegisterData}>
          <Input
            name={`place`}
            value={teamRegisterData.place}
            changeHandler={handleChangeTeamRegisterData}
            placeholderName={`Enter place`}
            type={`text`}
          />
          <br />
          <Input
            name={`date`}
            value={teamRegisterData.date}
            changeHandler={handleChangeTeamRegisterData}
            placeholderName={`Enter date`}
            type={`date`}
          />
          <br />

          <Input
            name={`team1`}
            value={teamRegisterData.team1}
            changeHandler={handleChangeTeamRegisterData}
            placeholderName={`Enter team1 name`}
            type={`text`}
          />
          <br />
          <Input
            name={`team2`}
            value={teamRegisterData.team2}
            changeHandler={handleChangeTeamRegisterData}
            placeholderName={`Enter team2 name`}
            type={`text`}
          />

          <div className="match-register-buttons">
            <button className="match-register-button" type="submit">
              Submit
            </button>
            <button
              className="match-register-button-back"
              onClick={navigateToMainPage}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamRegister;
