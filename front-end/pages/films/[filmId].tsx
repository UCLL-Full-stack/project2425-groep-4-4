import filmService from "@/service/filmService";
import { Film } from "@/types/types";
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

    useEffect(() => {
        if (filmId) {
            getFilmbyId();
        }
    }, [filmId]);

    if (!film) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container flex">
            <img className="cover-img" src={`/images/cover-${film.id}.jpg`} alt="movie cover" />
            <div>
                <h1>{film.titel}</h1>
                <p>{film.beschrijving}</p>
                <p>Duur: {film.speeltijd}min</p>
                <p>Acteurs: {film.acteurs?.join(", ")}</p>
            </div>
        </div>
    );
};

export default ReadFilmById;