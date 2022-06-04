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


function MobileApp() {
  const [isAuth,setIsAuth] = useState(false);
  return (
    <Router>
      <HamburgerMenu isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/posts" element={<Posts isAuth={isAuth}/>} />
        <Route path = "/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default MobileApp;
