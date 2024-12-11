import { Film } from "@/types/types";
import { useRouter } from "next/router";
import React from "react";

type Props = {
    films: Array<Film>;
};

const FilmOverview: React.FC<Props> = ({ films }: Props) => {
    const router = useRouter();

    const goToFilmPage = (id: number) => {
        router.push("/films/" + id)
    }


    if (!films || films.length === 0) {
        return <p>Geen films beschikbaar.</p>;
    }
    
    return (
        <div className="flex wrap center-content container">
            {films.map((film, index) => (
                <div
                    className="card"
                    onClick={() => goToFilmPage(film.id)}
                >
                    <div className="poster">
                        <img src={`./images/cover-${film.id}.jpg`} alt="movie cover" />
                    </div>
                    <div className="details">
                        <p className="movie-title">{film.titel}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilmOverview;