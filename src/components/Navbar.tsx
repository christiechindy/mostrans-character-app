import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink className={({isActive}) => (isActive ? "activeLink" : "")} to="/list-characters">Characters List</NavLink>
            <NavLink className={({isActive}) => (isActive ? "activeLink" : "")} to="/list-locations">Character By Location</NavLink>
        </div>
    )
}

export default Navbar