import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-200">
      <Link to="/" className="mr-4 font-semibold">Home</Link>
      <Link to="/pastes" className="mr-4 font-semibold">Pastes</Link>
    </nav>
  );
};

export default Navbar;
