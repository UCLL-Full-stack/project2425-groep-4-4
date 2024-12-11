import { Film } from "@/types/types";
import React from "react";

type Props = {
    films: Array<Film>;
};

const FilmOverview: React.FC<Props> = ({ films }: Props) => {
    if (!films || films.length === 0) {
        return <p>Geen films beschikbaar.</p>;
    }
    
    return (
        <div>
            <div className="flex wrap">
                {films.map((film, index) => (
                    <div className="card">
                        <div className="poster">
                            <img src="./images/movie-cover.jpg" alt="movie cover" />
                        </div>
                        <div className="details">
                            <p className="movie-title">{film.titel}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilmOverview;