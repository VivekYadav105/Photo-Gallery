import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Signup from "./components/auth/signup";
import Home from './components/home/home'
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/forgot";
import Verify from "./components/auth/verify";
import ResetPassword from "./components/auth/reset";
import React from "react";
import Header from "./components/partials/header";
import Gallery from "./components/gallery/gallery";
import NotFound from "./components/notFound/notFound";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation()

  useEffect(()=>{
    function checkUser(){
      const storedUser = localStorage.getItem(process.env.REACT_APP_USER_SESSION_LOGIN)
      if(storedUser){
        setUser(atob(storedUser.split('.')[1]))
      }
    }
    checkUser()
  },[])
  
  function logout() {
    localStorage.setItem(process.env.REACT_APP_USER_SESSION_LOGIN, '');
    setUser(null);
    window.location.href = "/login";
  }

  function login(i) {
    setUser(i);
    localStorage.setItem(process.env.REACT_APP_USER_SESSION_LOGIN, i);
    return true
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ user, login, logout }}>
          {location.pathname==='/'&&<Header></Header>}
          <Routes>
            <Route element={<Signup />} exact path="/signup"/>
            <Route element={<Login />} exact path="/login"/>
            <Route
              element={<Verify />}
              exact
              path="/verify/:token/:user"
            />
            <Route
              element={<ForgotPassword />}
              exact
              path="/forgotPassword"
            />
            <Route
              element={<ResetPassword />}
              exact
              path="/resetPassword/:token/:userid"
            />
            <Route
              path="/"
              exact
              element={<Gallery/>}
            />
            <Route path="/home" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
