import Header from "@/components/Header";
import filmService from "@/service/filmService";
import { Film } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ReadFilmById = () => {
    const [film, setFilm] = useState<Film | null>(null);
    const router = useRouter();
    const { filmId } = router.query;

    const getFilmbyId = async () => {
        try {
            const filmResponse = await filmService.getFilmById(Number(filmId));
            const filmBody = await filmResponse.json();
            setFilm(filmBody);
        } catch (error) {
            console.error("Error fetching film:", error);
        }
    };

    const goToProgramPage = (id: number) => {
        router.push("/program")
    }

    useEffect(() => {
        if (filmId) {
            getFilmbyId();
        }
    }, [filmId]);

    if (!film) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />
            <main>
                <div className="container flex details-container">
                    <img className="cover-img" src={`/images/cover-${film.id}.jpg`} alt="movie cover" />
                    <div className="details-content">
                        <h1>{film.titel}</h1>
                        <p className="details-item">{film.beschrijving}</p>
                        <p className="details-item">Duration: {film.speeltijd} min</p>
                        <p className="details-item">Actors: {film.acteurs?.join(", ")}</p>
                        <button className="button-big" onClick={() => goToProgramPage(film.id)}>See Program</button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ReadFilmById;