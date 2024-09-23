import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link className='navbaritem' to="/">Home</Link>
        <Link className='navbaritem' to="/products">Products</Link>
        <Link className='navbaritem' to="/add-product">Add Products</Link>
        <Link className='navbaritem' to="/test">Test</Link>
    </div>
  )
}

export default Navbar;