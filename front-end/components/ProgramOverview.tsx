import { Voorstelling } from "@/types";
import { Film } from "@/types";
import { useRouter } from "next/router";
import React from "react";

type Props = {
    voorstellingen: Array<Voorstelling>;
};

const ProgramOverview: React.FC<Props> = ({ voorstellingen }: Props) => {
    const router = useRouter();

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
                            src={`./images/cover-${voorstelling.film.id}.jpg`}
                            alt="movie cover"
                            className="movie-icon"
                        />
                    </div>
                    <div>
                        <p className="program-title">{voorstelling.film.titel}</p>
                        <div className="flex info">
                            <p>Lounge: {voorstelling.zaal.id}</p>
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