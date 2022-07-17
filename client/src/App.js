import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/Login";
import ForgotPassword from "./components/forgot";
import Verify from "./components/verify";
import ResetPassword from "./components/reset";
import React from "react";
import Home from "./components/home";
import Profile from "./components/profile";
import Header from "./components/header";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(sessionStorage.getItem(process.env.REACT_APP_USER_SESSION_LOGIN)||false);

  function logout() {
    sessionStorage.setItem(process.env.REACT_APP_USER_SESSION_LOGIN, false);
    setUser(false);
  }

  function login(i) {
    setUser(i);
    sessionStorage.setItem(process.env.REACT_APP_USER_SESSION_LOGIN, i);
    return true
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ user, login, logout }}>
        <Router>
          <Header></Header>
          <Routes>
            <Route element={<Home></Home>} exact path="/"></Route>
            <Route element={<Signup />} exact path="/signup"></Route>
            <Route element={<Login />} exact path="/login"></Route>
            <Route
              element={<Verify />}
              exact
              path="/verify/:token/:user"
            ></Route>
            <Route
              element={<ForgotPassword />}
              exact
              path="/forgotPassword"
            ></Route>
            <Route
              element={<ResetPassword />}
              exact
              path="/resetPassword/:token/:userid"
            ></Route>
            <Route
              path="/profile"
              exact
              element={user ? <Profile /> : <Navigate to="/login"></Navigate>}
            ></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
