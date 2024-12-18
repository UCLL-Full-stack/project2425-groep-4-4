import React from 'react';

const Header = () => {
  return (
    <header className="header flex wrap">
      <div className="flex logo-container header-section">
        <img className='logo' src="/images/logo.png" alt="Cineflex Logo" />
        <a href="/"><h2>Cineflex</h2></a>
      </div>
      <nav className="navigation">
        <ul className='flex wrap'>
          <li><a href="/allMovies">All Movies</a></li>
          <li><a href="/program">Program</a></li>
          <li><a href="/admin">Admin</a></li>
        </ul>
      </nav>
      <div className='header-section end'>
        <button className='button'>Login</button>
      </div>
      
    </header>
  );
};

export default Header;
