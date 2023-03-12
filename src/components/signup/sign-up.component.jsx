import { useState } from "react";
import Input from "../input/input.component";
import "./sign-up.styles.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/sign-in");
  };
  const handleChangeSignUpFormData = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const handleSubmitFormData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpFormData),
      });

      const data = await response.json();

      console.log(data);
      alert("SignUp successfull");
      setSignUpFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid s1">
      <div className="row  w-50 s2">
        <div className="signUpTitle">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmitFormData}>
          <Input
            name={`name`}
            value={signUpFormData.name}
            changeHandler={handleChangeSignUpFormData}
            placeholderName={`Enter your name`}
            type={`text`}
          />
          <br />
          <Input
            name={`email`}
            type={`email`}
            placeholderName={`Enter your email`}
            value={signUpFormData.email}
            changeHandler={handleChangeSignUpFormData}
          />
          <br />
          <Input
            name={`password`}
            type={`password`}
            placeholderName={`Enter your password`}
            value={signUpFormData.password}
            changeHandler={handleChangeSignUpFormData}
          />
          <br />
          <Input
            name={`confirmPassword`}
            type={`password`}
            placeholderName={`Confirm Password`}
            value={signUpFormData.confirmPassword}
            changeHandler={handleChangeSignUpFormData}
          />
          <br />

          <div className="sign-up-buttons">
            <button className="sign-up-button" onClick={navigateToPage}>
              Sign In
            </button>

            <button className="sign-up-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
