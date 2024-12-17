import { Voorstelling } from "@/types/types";
import { Film } from "@/types/types";
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
        <div className="flex wrap center-content container">
            {voorstellingen.map((voorstelling, index) => (
                <div
                    className="box"
                    onClick={() => goToVoorstellingPage(voorstelling.id)}
                >
                    <div className="icon">
                        <img src={`./images/cover-${voorstelling.film.id}.jpg`} alt="movie cover" />
                    </div>
                    <div className="details">
                        <p>Lounge: {voorstelling.zaal.id}</p>
                        <p>Date: {String(voorstelling.datum)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgramOverview;