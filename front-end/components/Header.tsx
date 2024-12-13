import React from 'react';

const Header = () => {
  return (
    <header className="header flex wrap">
      <div className="flex logo-container header-section">
        <img className='logo' src="/images/logo.png" alt="Cineflex Logo" />
        <h2>Cineflex</h2>
      </div>
      <nav className="navigation">
        <ul className='flex wrap'>
          <li><a href="/">All Movies</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className='header-section end'>
        <button className='button'>Login</button>
      </div>
      
    </header>
  );
};

export default Header;