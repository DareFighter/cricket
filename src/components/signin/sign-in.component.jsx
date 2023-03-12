import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../input/input.component";
import "./sign-in.styles.css";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    username: "",
    password: "",
  });
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  const handleChangeSignInFormData = (e) => {
    setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value });
  };

  const handleLogin = (username, password) => {
    if (username === "aaaaa" && password === "ppppp") {
      setAuth(true);
      navigate("/main-page");
    }
  };

  const handleSubmitSignInFormData = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/signup");
    const data = await response.json();

    const user = data.data.find(
      (user) =>
        user.name === signInFormData.username &&
        user.password === signInFormData.password
    );
    if (user) {
      setSignInFormData({
        username: "",
        password: "",
      });
      navigate("/main-page");
      alert("Sign in Successfull");
    } else {
      alert("Incorrect username or password");
    }
  };

  return (
    <div className="container sign-in-2">
      <div className="row w-50 ">
        <div className="sign-in-title">
          <h2>Sign In</h2>
        </div>
        <form onSubmit={handleSubmitSignInFormData}>
          <Input
            type={`text`}
            name={`username`}
            value={signInFormData.username}
            changeHandler={handleChangeSignInFormData}
            placeholderName={`Enter your username`}
          />
          <br />
          <Input
            name={`password`}
            type={`password`}
            value={signInFormData.password}
            changeHandler={handleChangeSignInFormData}
            placeholderName={`Enter your password`}
          />
          <br />

          <div className="buttons">
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
