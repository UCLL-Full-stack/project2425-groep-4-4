import { Film } from "@/types/types";


type Props = {
    films: Array<Film>;
};

const FilmOverview: React.FC<Props> = ({ films }: Props) => {
    if (!films || films.length === 0) {
        return <p>Geen films beschikbaar.</p>;
    }
    
    return (
        <div>
            <h2>Films</h2>
            <ul>
                {films.map((film, index) => (
                    <li>{film.titel} - {film.speeltijd}min - {film.beschrijving}</li>
                ))}
            </ul>
        </div>
    );
};

export default FilmOverview;