import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = (props) => {

  const handleClick = () => {
    console.log("you are now logging out");
    const key = props.token
    props.handleLogout()
    // the token has been cleared out but the profileContainer still has instance data about the logged out user
}

  return(
    <ul className="nav">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <button onClick={handleClick}>Log out</button>
      </li>
    </ul>
  )
};

export default NavBar;