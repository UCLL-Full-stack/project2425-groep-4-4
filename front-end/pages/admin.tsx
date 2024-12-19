import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/home.module.css';
import { Film } from '@/types';
import { useEffect, useState } from 'react';
import filmService from '@/service/filmService';
import useInterval from 'use-interval';

const AllMovies: React.FC = () => {
  const [films, setFilms] = useState<Array<Film>>([]);
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

  // Handle click on "Movies" header
  const setMovies = () => {
    const movieList = (
      <ul>
        {films.map((film) => (
          <li key={film.id}>{film.titel}</li>
        ))}
      </ul>
    );
    setContent(movieList);
  };

  // Fetch films on initial render
  useEffect(() => {
    getFilms();
  }, []);

  // Polling for updates every 5 seconds
  useInterval(() => {
    getFilms();
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
          <h2 onClick={setMovies}>Movies</h2>
          <h2 onClick={setMovies}>Actors</h2>
          <h2 onClick={setMovies}>Films</h2>
          <h2 onClick={setMovies}>Users</h2>
          <h2 onClick={setMovies}>Programs</h2>
        </div>
        <div id="admin-content">{content}</div>
        {error && <p className="error">{error}</p>}
      </main>
    </>
  );
};

export default AllMovies;