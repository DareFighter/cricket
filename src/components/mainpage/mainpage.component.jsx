import "./mainpage.styles.css";
import logo from "../../assets/kohli.jpg";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const navigateToMatchAdd = () => {
    navigate("/match-add");
  };

  const navigateToPlayerAdd = () => {
    navigate("/player-add");
  };

  const navigateToTeamList = () => {
    navigate("/show-team");
  };

  const navigateToPlayerList = () => {
    navigate("/show-player");
  };

  const navigateToWelcomPage = () => {
    navigate("/");
  };

  return (
    <div className="button-page">
      <img src={logo} alt="Logo" className="logo" />
      <div className="button-container">
        <button className="add-team-button" onClick={navigateToMatchAdd}>
          Add Team
        </button>
        <button className="add-player-button" onClick={navigateToPlayerAdd}>
          Add Player
        </button>
        <button className="team-list-button" onClick={navigateToTeamList}>
          Show Team List
        </button>
        <button className="player-list-button" onClick={navigateToPlayerList}>
          Show Player List
        </button>
        <button className="sign-out-button" onClick={navigateToWelcomPage}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default MainPage;
