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
  const [popupInput, setPopupInput] = useState<string>('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Film | Acteur | User | Voorstelling | null>(null);


  const togglePopup = (item?: Film | Acteur | User | Voorstelling | null) => {
    setSelectedItem(item || null);
    setPopupVisible(!isPopupVisible);
  };

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
    refreshInterval: 10000000, 
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
              <button className='button' onClick={() => togglePopup(film)}>Edit</button>
              <button className='button red-button'onClick={() => deleteItem(film)}>Delete</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setPopupInput("movie")
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
            <button className='button' onClick={() => togglePopup(actor)}>Edit</button>
            <button className='button red-button'onClick={() => deleteItem(actor)}>Delete</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setPopupInput("actor")
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
            <button className='button' onClick={() => togglePopup(user)}>Edit</button>
            <button className='button red-button'onClick={() => deleteItem(user)}>Delete</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setPopupInput("user")
    setContent(userList);
  }

  const setProgramsList = () => {
    const programList = (
      <div>
        {data?.programs.map((program: Voorstelling) => (
          <div className='flex admin-item-container'>
            <div key={program.id} className='item-info'>
              <p>Zaal: {program.zaal.zaalnummer}</p>
              <p>Film: {program.film.titel}</p>
              <p>Datum: {new Date(program.datum).toLocaleDateString()}</p>
              <p>Tijd: {program.tijdstip}</p>
            </div>
            <div className='button-container'>
            <button className='button' onClick={() => togglePopup(program)}>Edit</button>
            <button className='button red-button'onClick={() => deleteItem(program)}>Delete</button>
            </div>
          </div>          
        ))}
      </div>
    );
    setPopupInput("program")
    setContent(programList);
  }

  const handleMovieSubmit = async (film: Film) => {
    // Add your submit logic here
  };

  const deleteItem = async (item: Film | Acteur | User | Voorstelling) => {
    if ('titel' in item) {
      console.log(item.id);
      const response = await filmService.deleteFilm(item.id);
      console.log(response);
      if (response.ok) {
        setMoviesList();
      }
    }
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
        {isPopupVisible && popupInput === "movie" && (
          <div className='popup'>
            <h2>Edit Movie</h2>
            <p>This is the popup content.</p>
            <button onClick={() => togglePopup(null)}>
              Close
            </button>
          </div>
        )}
        {isPopupVisible && popupInput === "actor" && (
          <div className='popup'>
            <h2>Edit actor</h2>
            <p>This is the popup content.</p>
            <button onClick={() => togglePopup(null)}>
              Close
            </button>
          </div>
        )}
        {isPopupVisible && popupInput === "user" && (
          <div className='popup'>
            <h2>Edit user</h2>
            <p>This is the popup content.</p>
            <button onClick={() => togglePopup(null)}>
              Close
            </button>
          </div>
        )}
        {isPopupVisible && popupInput === "program" && (
          <div className='popup'>
            <h2>Edit program</h2>
            <p>This is the popup content.</p>
            <button onClick={() => togglePopup(null)}>
              Close
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