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
import useSWR from 'swr';

const program: React.FC = () => {

  const getvoorstellingen = async () => {
    const voorstellingenResponse = await voorstellingService.getAllVoorstellingen();
    if (voorstellingenResponse.ok) {
      const voorstellingen = await voorstellingenResponse.json();
      return voorstellingen;
    }
  };

  const { data, isLoading, error } = useSWR("getvoorstellingen", getvoorstellingen);
  
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
            voorstellingen={data}
          />
        </>
      </main>
    </>
  );
};

export default program;