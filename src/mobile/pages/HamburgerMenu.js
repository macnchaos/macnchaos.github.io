import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase-config";
const COLORS = {
  primaryDark: "#115b4c",
  primaryLight: "#B6EDC8",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
`;

const NavBackground = styled.div`
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 3rem;
  height: 3px;
  display: inline-block;
  margin-top: 2rem; //icon margin
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 3rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 3rem;
  font-weight: 300;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 1rem 2rem;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;
function HamburgerMenu({isAuth,setIsAuth}) {
  const [click, setClick] = useState(false);
  const currentLocation = useRef("");
  const handleClick = () => setClick(!click);
  const signUserOut = ()=>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }
  const location = useLocation();
  useEffect(() => {
    currentLocation.current=location.pathname;
    console.log(currentLocation.current);
  }, [location.pathname])
  
  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>
          <li>
            <ItemLink onClick={handleClick} to="/">
              {
                currentLocation.current==="/"?(<u>&#9658;Home</u>):
                "Home"
              }
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/blog">
              {
                currentLocation.current==="/blog"?(<u>&#9658;Blog</u>):
                "Blog"
              }
            </ItemLink>
          </li>
          {
            isAuth===false ? <li>
              <ItemLink onClick={handleClick} to="/login">
                {
                  currentLocation.current==="/login"?(<u>&#9658;Login</u>):
                  "Login"
                }
              </ItemLink>
            </li> : 
            <>
              <li>
                <ItemLink onClick={handleClick} to="/createPost">
                    {
                      currentLocation.current==="/createPost"?(<u>&#9658;Create</u>):
                      "Create"
                    }
                </ItemLink>
              </li>
              
              <button className="mobile-button-logout" align="right" onClick={signUserOut}> LogOut </button>
            </>
          }
        </List>
      </Navigation>
    </>
  );
}

export default HamburgerMenu;