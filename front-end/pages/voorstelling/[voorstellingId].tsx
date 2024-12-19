import Header from "@/components/Header";
import voorstellingService from "@/service/voorstellingService";
import { Voorstelling } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ReadVoorstellingById = () => {
    const [voorstelling, setVoorstelling] = useState<Voorstelling | null>(null);
    const router = useRouter();
    const { voorstellingId } = router.query;

    const getvoorstellingbyId = async () => {
        try {
            const voorstellingResponse = await voorstellingService.getVoorstellingById(Number(voorstellingId));
            const voorstellingBody = await voorstellingResponse.json();
            setVoorstelling(voorstellingBody);
        } catch (error) {
            console.error("Error fetching voorstelling:", error);
        }
    };

    useEffect(() => {
        if (voorstellingId) {
            getvoorstellingbyId();
        }
    }, [voorstellingId]);

    if (!voorstelling) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />
            <main>
                <div className="container flex details-container">
                    <img className="cover-img" src={`/images/cover-${voorstelling.id}.jpg`} alt="movie cover" />
                    <div>
                        <div className="details-content">
                            <h1>{voorstelling.film.titel}</h1>
                            <p className="details-item">{voorstelling.film.beschrijving}</p>
                            <p className="details-item">Duration: {voorstelling.film.speeltijd} min</p>
                            <p className="details-item">Actors: {voorstelling.film.acteurs?.join(", ")}</p>
                            <div className="flex buy-box">
                                <div className="flex buy-info">
                                    <p className="details-item">{new Date(voorstelling.datum).toLocaleDateString()}</p>
                                    <p className="details-item">{voorstelling.tijdstip}</p>
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