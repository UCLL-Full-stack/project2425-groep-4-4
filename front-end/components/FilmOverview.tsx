import { Film, UserStorage } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {
    films: Array<Film>;
};

const FilmOverview: React.FC<Props> = ({ films }: Props) => {
    const router = useRouter();
      const [loggedInUser, setLoggedInUser] = useState<UserStorage | null>(null);
    
      useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        setLoggedInUser(user ? JSON.parse(user) : null);
      }, []);

    const goToFilmPage = (id: number) => {
        router.push("/films/" + id)
    }
    
    if (!loggedInUser) {
        return <p>Log in om films te bekijken.</p>;
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