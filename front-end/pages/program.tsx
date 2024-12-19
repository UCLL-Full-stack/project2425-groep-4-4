import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import styles from '../styles/home.module.css';
import { Voorstelling } from '@/types';
import { useEffect, useState } from 'react';
import voorstellingService from '@/service/voorstellingService';
import ProgramOverview from '@/components/ProgramOverview';
import useInterval from 'use-interval';
import { useRouter } from 'next/router';

const program: React.FC = () => {
  const [voorstellingen, setvoorstellingen] = useState<Array<Voorstelling>>();
  const [error, setError] = useState<String>();

  const getvoorstellingen = async () => {
    setError("");

    const responses = await Promise.all([
      voorstellingService.getAllVoorstellingen()
    ]);
    const [voorstellingResponse] = responses;
    const voorstellingen = await voorstellingResponse.json();
    setvoorstellingen(voorstellingen);
  };

  useEffect(() => {
    getvoorstellingen();
  }, []);

  useInterval(() => {
    getvoorstellingen();
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
          <h1>Program</h1>
        </span>
        <>
          <ProgramOverview
            voorstellingen={voorstellingen}
          />
        </>
      </main>
    </>
  );
};

export default program;