import Header from "@/components/Header";
import filmService from "@/service/filmService";
import { Film } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/home.module.css";

const ReadFilmById = () => {
    const router = useRouter();
    const { filmId } = router.query;
    const filmidTest = 45

    const getFilmbyId = async () => {
        const filmResponse = await filmService.getFilmById(Number(filmId));
        if (filmResponse.ok) {
            const film = await filmResponse.json();
            return film;
        }
    };

    const { data, isLoading, error } = useSWR("film", getFilmbyId)

    const goToProgramPage = (id: number) => {
        router.push("/program")
    }

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
            <Header />
            <main>
                <div className="container flex details-container">
                    <img className="cover-img" src={`/images/cover-${data.id}.jpg`} alt="movie cover" />
                    <div className="details-content">
                        <h1>{data.titel}</h1>
                        <p className="details-item">{data.beschrijving}</p>
                        <p className="details-item">Duration: {data.speeltijd} min</p>
                        <p className="details-item">Actors: {data.acteurs?.join(", ")}</p>
                        <button className="button-big" onClick={() => goToProgramPage(data.id)}>See Program</button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ReadFilmById;