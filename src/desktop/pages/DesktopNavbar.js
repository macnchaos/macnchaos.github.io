import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase-config";
const DesktopNavbar = ({isAuth}) => {
    const [currentLocation,setCurrentLocation] = useState("");
    const signUserOut = ()=>{
        signOut(auth).then(()=>{
          window.location.pathname = "/login"
        })
      }
    const location = useLocation();//on every route change the nav bar is rerendered
    useEffect(() => {
        setCurrentLocation(location.pathname);
    }, [location.pathname])
    return (
        <nav>
            <Link to="/">
            {
                currentLocation==="/"?(<u>&#9658;Home</u>):
                "Home"
            }
            </Link>
            <Link to="/blog">
            {
                currentLocation==="/blog"?(<u>&#9658;Blog</u>):
                "Blog"
            }
            </Link>
            {
            isAuth? 
            <>
                <Link to="/createpost">
                {
                    currentLocation==="/createpost"?(<u>&#9658;Create</u>):
                    "Create"
                }
                </Link>
                
                <button align="right" className="desktop-button-logout" onClick={signUserOut}> LogOut </button>
            </>
            :
            <Link to="/login">
                {
                    currentLocation==="/login"?(<u>&#9658;Login</u>):
                    "Login"
                }
            </Link> 
            }
        </nav>
    )
};

export default DesktopNavbar;
