import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/home.module.css';
import { Acteur, Film, User, Voorstelling } from '@/types/types';
import { useEffect, useState } from 'react';
import filmService from '@/service/filmService';
import useInterval from 'use-interval';
import acteurService from '@/service/acteurService';
import userService from '@/service/userService';
import voorstellingService from '@/service/voorstellingService';

const AllMovies: React.FC = () => {
  const [films, setFilms] = useState<Array<Film>>([]);
  const [actors, setActors] = useState<Array<Acteur>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [programs, setPrograms] = useState<Array<Voorstelling>>([]);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<JSX.Element | null>(null);

  // Fetch all films from the service
  const getFilms = async () => {
    try {
      setError(null); // Reset any previous errors
      const response = await filmService.getAllFilms();
      const data = await response.json();
      setFilms(data);
    } catch (err) {
      setError('Failed to fetch films');
    }
  };

  const getActors = async () => {
    try {
      setError(null);
      const response = await acteurService.getAllActeurs();
      const data = await response.json();
      setActors(data);
    } catch (err) {
      setError('Failed to fetch actors');
    }
  }

  const getUsers = async () => {
    try {
      setError(null);
      const response = await userService.getAllUsers();
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  }

  const getPrograms = async () => {
    try {
      setError(null);
      const response = await voorstellingService.getAllVoorstellingen();
      const data = await response.json();
      setPrograms(data);
    } catch (err) {
      setError('Failed to fetch programs');
    }
  }

  // Handle click on "Movies" header
  const setMoviesList = () => {
    const movieList = (
      <div>
        {films.map((film) => (
          <div className='flex admin-item-container'>
            <div key={film.id} className='item-info'>
              <p>{film.titel}</p>
              <p>{film.beschrijving}</p>
              <p>{film.speeltijd}</p>
            </div>
            <div className='button-container'>
              <button className='button'>Edit</button>
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
        {actors.map((actor) => (
          <div className='flex admin-item-container'>
            <div key={actor.id} className='item-info'>
              <p>{actor.voornaam} {actor.achternaam}</p>
              <p>{new Date(actor.geboortedatum).toLocaleDateString()}</p>
              <p>{actor.nationaliteit}</p>
            </div>
            <div className='button-container'>
              <button className='button'>Edit</button>
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
        {users.map((user) => (
          <div className='flex admin-item-container'>
            <div key={user.id} className='item-info'>
              <p>{user.voornaam} {user.achternaam}</p>
              <p>{user.email}</p>
            </div>
            <div className='button-container'>
              <button className='button'>Edit</button>
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
        {programs.map((program) => (
          <div className='flex admin-item-container'>
            <div key={program.id} className='item-info'>
              <p>{program.zaal.id}</p>
              <p>{program.film.titel}</p>
            </div>
            <div className='button-container'>
              <button className='button'>Edit</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setContent(programList);
  }

  // Fetch films on initial render
  useEffect(() => {
    getFilms(),
    getActors(),
    getUsers(),
    getPrograms()
  }, []);

  // Polling for updates every 5 seconds
  useInterval(() => {
    getFilms(),
    getActors(),
    getUsers(),
    getPrograms()
  }, 5000);

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