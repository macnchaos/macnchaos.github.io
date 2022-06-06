import React, {useState} from "react";
import './MobileApp.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HamburgerMenu from "./pages/HamburgerMenu";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Posts from "./pages/Posts";

function MobileApp() {
  const [isAuth,setIsAuth] = useState(false);
  return (
    <Router>
      <HamburgerMenu isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path = "/posts/:id" element={<Posts isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default MobileApp;
