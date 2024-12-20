import Head from 'next/head';
import Header from '../components/Header';
import styles from "@/styles/home.module.css";
import { Acteur, Film, User, Voorstelling } from '@/types';
import { useEffect, useState } from 'react';
import filmService from '@/service/filmService';
import useInterval from 'use-interval';
import acteurService from '@/service/acteurService';
import userService from '@/service/userService';
import voorstellingService from '@/service/voorstellingService';
import useSWR from 'swr';

const AllMovies: React.FC = () => {
  const [content, setContent] = useState<JSX.Element | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const toggleConfirm = () => {
    setConfirmVisible(!isConfirmVisible);
  }

  const fetcher = async () => {
    const responses = await Promise.all([
      voorstellingService.getAllVoorstellingen(),
      userService.getAllUsers(),
      acteurService.getAllActeurs(),
      filmService.getAllFilms()
    ])

    const [programsResponse, usersResponse, actorsResponse, filmsResponse] = responses;

    if (programsResponse.ok && usersResponse.ok && actorsResponse.ok && filmsResponse.ok) {
      const programs = await programsResponse.json();
      const users = await usersResponse.json();
      const actors = await actorsResponse.json();
      const films = await filmsResponse.json();
      return { programs, users, actors, films };
    }
  }

  const { data, isLoading, error } = useSWR("fetcher", fetcher, {
    refreshInterval: 5000, 
  });
  

  if (isLoading) {
    return (
      <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <p>Loading...</p>
      </main>
    </>
    )
  }

  if (error) {
    return (
      <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <p>Error: {error.message}</p>
      </main>
    </>
    )
  }

  // Handle click on "Movies" header
  const setMoviesList = () => {
    const movieList = (
      <div>
        {data?.films.map((film: Film) => (
          <div className='flex admin-item-container'>
            <div key={film.id} className='item-info'>
              <p>{film.titel}</p>
              <p>{film.beschrijving}</p>
              <p>{film.speeltijd}</p>
            </div>
            <div className='button-container'>
              <button className='button' onClick={togglePopup}>Edit</button>
              <button className='button red-button' onClick={toggleConfirm}>Delete</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setContent(movieList);
  };

  const setActorsList = () => {
    const actorList = (
      <div>
        {data?.actors.map((actor: Acteur) => (
          <div className='flex admin-item-container'>
            <div key={actor.id} className='item-info'>
              <p>{actor.voornaam} {actor.achternaam}</p>
              <p>{actor.geboortedatum ? new Date(actor.geboortedatum).toLocaleDateString() : 'N/A'}</p>
              <p>{actor.nationaliteit}</p>
            </div>
            <div className='button-container'>
              <button className='button' onClick={togglePopup}>Edit</button>
              <button className='button red-button'>Delete</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setContent(actorList);
  }

  const setUsersList = () => {
    const userList = (
      <div>
        {data?.users.map((user: User) => (
          <div className='flex admin-item-container'>
            <div key={user.id} className='item-info'>
              <p>{user.voornaam} {user.achternaam}</p>
              <p>{user.email}</p>
            </div>
            <div className='button-container'>
              <button className='button' onClick={togglePopup}>Edit</button>
              <button className='button red-button'>Delete</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setContent(userList);
  }

  const setProgramsList = () => {
    const programList = (
      <div>
        {data?.programs.map((program: Voorstelling) => (
          <div className='flex admin-item-container'>
            <div key={program.id} className='item-info'>
              <p>{program.zaal.id}</p>
              <p>{program.film.titel}</p>
            </div>
            <div className='button-container'>
              <button className='button' onClick={togglePopup}>Edit</button>
              <button className='button red-button'>Delete</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setContent(programList);
  }

  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        {isPopupVisible && (
          <div className='popup'>
            <h2>Popup Content</h2>
            <p>This is the popup content.</p>
            <button onClick={togglePopup}>
              Close
            </button>
          </div>
        )}
        {isConfirmVisible && (
          <div className='popup'>
            <h2>Popup Content</h2>
            <p>This is the popup content.</p>
            <button onClick={toggleConfirm} className='button green-button'>
              Yes
            </button>
            <button onClick={toggleConfirm} className='button red-button'>
              No
            </button>
          </div>
        )}
        <div className="flex admin-header">
          <h2 onClick={setMoviesList}>Movies</h2>
          <h2 onClick={setActorsList}>Actors</h2>
          <h2 onClick={setUsersList}>Users</h2>
          <h2 onClick={setProgramsList}>Programs</h2>
        </div>
        <div id="admin-content">{content}</div>
        {error && <p className="error">{error}</p>}
      </main>
    </>
  );
};

export default AllMovies;