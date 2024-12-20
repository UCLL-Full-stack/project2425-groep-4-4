import { UserStorage, Voorstelling } from "@/types";
import { Film } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {
    voorstellingen: Array<Voorstelling>;
};

const ProgramOverview: React.FC<Props> = ({ voorstellingen }: Props) => {
    const router = useRouter();
          const [loggedInUser, setLoggedInUser] = useState<UserStorage | null>(null);
        
          useEffect(() => {
            const user = sessionStorage.getItem('loggedInUser');
            setLoggedInUser(user ? JSON.parse(user) : null);
          }, []);
    
        if (!loggedInUser) {
            return <p>Log in om voorstellingen te bekijken.</p>;
        }
        

    const goToVoorstellingPage = (id: number) => {
        router.push("/voorstelling/" + id)
    }


    if (!voorstellingen || voorstellingen.length === 0) {
        return <p>Geen voorstellingen beschikbaar.</p>;
    }
    
    return (
        <div className="flex wrap center-content program-container">
            {voorstellingen.map((voorstelling, index) => (
                <div
                    className="box"
                    onClick={() => goToVoorstellingPage(voorstelling.id)}
                >
                    <div>
                        <img 
                            src={`./images/cover-${voorstelling.film.titel.replace(/ /g, '_')}.jpg`}
                            alt="movie cover"
                            className="movie-icon"
                        />
                    </div>
                    <div>
                        <p className="program-title">{voorstelling.film.titel}</p>
                        <div className="flex info">
                            <p>Lounge: {voorstelling.zaal.zaalnummer}</p>
                            <p>Places Left: {voorstelling.zaal.plaatsen}</p>
                            <p>Date: {new Date(voorstelling.datum).toLocaleDateString()}</p>
                            <p>Time: {voorstelling.tijdstip}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgramOverview;