import { Film } from "@/types/types";


type Props = {
    films: Array<Film>;
};

const FilmOverview: React.FC<Props> = ({ films }: Props) => {
    return (
        <div>
            <h2>Films</h2>
            <ul>
                {films.map((film, index) => (
                    <li key={film.id}>{film.titel}</li>
                ))}
            </ul>
        </div>
    );
};

export default FilmOverview;