import { Film } from "@/types/types";
import { useEffect, useState } from "react"


const readFilmById = () => {
    const [film, setFilm] = useState<Film>(null);

    const router = useRouter()
    const { filmId } = router.query

    useEffect( () => {
        if (filmId)
            getFilmbyId()
    })


    return (
        <>
            <div className="container">
                <img src={`./images/cover-${film.id}.jpg`} alt="movie cover" />
                <div>
                    <h1>{film.titel}</h1>
                    <p>{film.beschrijving}</p>
                    <p>Duur: {film.speeltijd}</p>
                    <p>Acteurs: {film.acteurs.toString()}</p>
                </div>

            </div>
        </>
    )
}