import React from 'react';

const Header = () => {
  return (
    <header className="header flex">
      <div className="flex logo-container">
        <img className='logo' src="./images/logo.png" alt="Cineflex Logo" />
        <h2>Cineflex</h2>
      </div>
      <nav className="navigation">
        <ul className='flex'>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <button className='button'>Login</button>
    </header>
  );
};

export default Header;
