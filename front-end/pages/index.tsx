import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '../styles/home.module.css';
import { Film } from '@/types/types';
import { useEffect, useState } from 'react';
import filmService from '@/service/filmService';
import FilmOverview from '@/components/film-overview';

const Home: React.FC = () => {
  const [films, setFilms] = useState<Array<Film>>();
  const [error, setError] = useState<String>();

  const getFilms = async () => {
    setError("");

    const responses = await Promise.all([
      filmService.getAllFilms()
    ]);
    const [filmResponse] = responses;
    const films = await filmResponse.json();
    setFilms(films);
  };

  useEffect(() => {
    getFilms();
  });
  
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <main className={styles.main}>
        <span>
          <Image
            src="/images/logo.png"
            alt="CineFlex Logo"
            className={styles.vercelLogo}
            width={50}
            height={50}
          />
          <h1>Welcome!</h1>
        </span>
        <>
          {error && <div>{error}</div>}
          {films && (
            <FilmOverview
              films={films}
            />
          )}
        </>
      </main>
    </>
  );
};

export default Home;
