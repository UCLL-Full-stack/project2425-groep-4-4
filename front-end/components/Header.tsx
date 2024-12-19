import { UserStorage } from '@/types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInterval from 'use-interval';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserStorage | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser');
    setLoggedInUser(user ? JSON.parse(user) : null);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    setLoggedInUser(null)
    window.location.href = '/login';
  }

  const handleLogin = () => {
    window.location.href = '/login';
  }
  
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
          {loggedInUser && loggedInUser.role === 'admin' &&
            <li><a href="/admin">Admin</a></li>
          }
        </ul>
      </nav>
      <div className='header-section end'>
        {!loggedInUser && <button className='button' onClick={handleLogin}>Login</button>}
        {loggedInUser && <button className='button' onClick={handleLogout}>Logout</button>}
      </div>
      
    </header>
  );
};

export default Header;
