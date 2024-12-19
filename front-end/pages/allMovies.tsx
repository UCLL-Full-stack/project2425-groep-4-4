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
import useSWR from 'swr';

const allMovies: React.FC = () => {

  const getFilms = async () => {
    const filmsResponse = await filmService.getAllFilms();
    if (filmsResponse.ok) {
      const films = await filmsResponse.json();
      return films;
    }
  };

  const { data, isLoading, error } = useSWR("films", getFilms, {
    refreshInterval: 1000,
  });

  if (isLoading) {
    return (
      <>
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

      <Header />
      <main className={styles.main}>
        <p>Error: {error}</p>
      </main>
    </>
    )
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
        <span>
          <h1>All Movies</h1>
        </span>
        <>
          <FilmOverview
            films={data}
          />
        </>
      </main>
    </>
  );
};

export default allMovies;