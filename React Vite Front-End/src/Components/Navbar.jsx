import React from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../context';



const Navbar = () => {
  const { dispatch } = useAppContext();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };
  return (
    
    <nav className="navbar">
  
  <ul className="navbar-list">
    <li className="navbar-item"><Link to="/">Home</Link></li>
    <li className="navbar-item"><Link to="/favs">Odontologo Favorito</Link></li>
    <li className="navbar-item"><Link to="/contact">Contact</Link></li>
  </ul>
  <div className="navbar-brand">
    <button className="theme-button" onClick={toggleTheme}>Cambiar Tema</button>
  </div>
</nav>
  )
}

export default Navbar