import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/auth/signup";
import Login from "./components/Login";
import ForgotPassword from "./components/forgot";
import Verify from "./components/auth/verify";
import ResetPassword from "./components/auth/reset";
import React from "react";
import Header from "./components/partials/header";
import Gallery from "./components/gallery/gallery";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(localStorage.getItem(process.env.REACT_APP_USER_SESSION_LOGIN)||false);

  function logout() {
    localStorage.setItem(process.env.REACT_APP_USER_SESSION_LOGIN, false);
    setUser(false);
  }

  function login(i) {
    setUser(i);
    localStorage.setItem(process.env.REACT_APP_USER_SESSION_LOGIN, i);
    return true
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ user, login, logout }}>
        <Router>
          {window.location.pathname==='/'&&<Header></Header>}
          <Routes>
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
              path="/"
              exact
              element={user ? <Gallery /> : <Navigate to="/login"></Navigate>}
            ></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
