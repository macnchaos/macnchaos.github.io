import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
const DesktopNavbar = ({isAuth}) => {
    const signUserOut = ()=>{
        signOut(auth).then(()=>{
          window.location.pathname = "/login"
        })
      }
    return (
        <nav>
            <Link to="/">
            Home
            </Link>
            <Link to="/blog">
            Blog
            </Link>
            <Link to="/PaginationBlog">
            PaginationBlog
            </Link>
            {
            isAuth? 
            <>
                <Link to="/createpost">
                Create
                </Link>

                <Link to="/PaginationCreateItem">
                CreatePaginated
                </Link>
                
                <button align="right" className="desktop-button-logout" onClick={signUserOut}> LogOut </button>
            </>
            :
            <Link to="/login">
                Login
            </Link> 
            }
        </nav>
    )
};

export default DesktopNavbar;
