import Header from "@/components/Header";
import voorstellingService from "@/service/voorstellingService";
import { Voorstelling } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/home.module.css";

const ReadVoorstellingById = () => {
    const router = useRouter();
    const { voorstellingId } = router.query;

    const getvoorstellingbyId = async () => {
        const voorstellingResponse = await voorstellingService.getVoorstellingById(Number(voorstellingId));
        if (voorstellingResponse.ok) {
            const voorstelling = await voorstellingResponse.json();
            return voorstelling;
        }
    };

    const { data, isLoading, error } = useSWR("voorstelling", getvoorstellingbyId)

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
                    <div>
                        <div className="details-content">
                            <h1>{data.film.titel}</h1>
                            <p className="details-item">{data.film.beschrijving}</p>
                            <p className="details-item">Duration: {data.film.speeltijd} min</p>
                            <p className="details-item">Actors: {data.film.acteurs?.join(", ")}</p>
                            <div className="flex buy-box">
                                <div className="flex buy-info">
                                    <p className="details-item">{new Date(data.datum).toLocaleDateString()}</p>
                                    <p className="details-item">{data.tijdstip}</p>
                                </div>
                                <button className="button-big">Buy Ticket</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </main>
        </>
    );
};

export default ReadVoorstellingById;