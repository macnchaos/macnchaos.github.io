import React, {useState} from "react";
import './MobileApp.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HamburgerMenu from "./pages/HamburgerMenu";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import {signOut} from "firebase/auth";
import { auth } from "../firebase-config";


function MobileApp() {
  const [isAuth,setIsAuth] = useState(false);
  const signUserOut = ()=>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  };
  return (
    <Router>
      <HamburgerMenu/>
      <Routes>
        <Route path = "/" element={<Home isAuth={isAuth}/>} />
        <Route path = "/Posts" element={<Posts isAuth={isAuth}/>} />
        <Route path = "/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default MobileApp;
