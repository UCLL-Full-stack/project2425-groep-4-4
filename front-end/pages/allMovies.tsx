import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import styles from '../styles/home.module.css';
import { Film } from '@/types';
import { useEffect, useState } from 'react';
import filmService from '@/service/filmService';
import FilmOverview from '@/components/FilmOverview';
import useInterval from 'use-interval';
import { useRouter } from 'next/router';

const allMovies: React.FC = () => {
  const [films, setFilms] = useState<Array<Film>>();
  const [error, setError] = useState<String>();

  const getFilms = async () => {
    setError("");

    const response = await filmService.getAllFilms()
    
    if (!response.ok) {
      if (response.status === 401) {
        setError("You are not authorized to view this page. Please log in.");
      }
      else {
        setError(response.statusText);
      }

    } else {
        const films = await response.json();
        setFilms(films);
    }
  };

  useEffect(() => {
    getFilms();
  }, []);

  useInterval(() => {
    getFilms();
  }, 5000)
  
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
        <span>
          <h1>All Movies</h1>
        </span>
        <>
          <FilmOverview
            films={films || []}
          />
        </>
      </main>
    </>
  );
};

export default allMovies;