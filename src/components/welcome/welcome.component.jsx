import "./welcome.styles.css";
import { useNavigate } from "react-router-dom";
const WelcomeComponent = ({ isShowComponent }) => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };
  return (
    <div className="welcome-page">
      <div className="welcome-page__overlay"></div>
      <div className="welcome-page__content">
        <h1 className="welcome-page__title">IPL Management System</h1>
        <button className="welcome-page__button" onClick={navigateToSignUp}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeComponent;
