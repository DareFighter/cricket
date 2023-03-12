import React, { useEffect, useState } from "react";
import Input from "./components/input/input.component";
import MainPage from "./components/mainpage/mainpage.component";
import PlayerRegistration from "./components/player-register/player-register.component";
import PlayerList from "./components/playerList/playerlist.component";
import SignIn from "./components/signin/sign-in.component";
import SignUp from "./components/signup/sign-up.component";
import TeamRegister from "./components/TeamRegistration/teamRegister.component";
import WelcomeComponent from "./components/welcome/welcome.component";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./routes/route/route.component";
import TeamList from "./components/teamlist/teamlist.component";

const App = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [auth, setAuth] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "aaaaa" && password === "ppppp") {
      setAuth(true);
    }
  };

  const isShowComponent = () => {
    setShowComponent(true);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<WelcomeComponent />} />

            <Route path="/main-page" element={<MainPage />} />
            <Route path="/sign-in" element={<SignIn />} />

            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/player-add" element={<PlayerRegistration />} />
            <Route path="/match-add" element={<TeamRegister />} />
            <Route path="/show-team" element={<TeamList />} />
            <Route path="/show-player" element={<PlayerList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
