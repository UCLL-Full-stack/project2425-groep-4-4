import filmService from "@/service/filmService";
import UserService from "@/service/userService";
import { Acteur, ActeurInput, StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useInterval from "use-interval";

type Props = {
    acteurList: Acteur[];
}

const CreateMovieForm: React.FC<Props> = ({ acteurList }: Props) => {
    const [titel, setTitel] = useState("");
    const [beschrijving, setBeschrijving] = useState("");
    const [speeltijd, setSpeeltijd] = useState(0);
    const [acteurs, setActeurs] = useState<Acteur[]>([]); // Store multiple selected actors
    const [titelError, setTitelError] = useState<string | null>(null);
    const [beschrijvingError, setBeschrijvingError] = useState<string | null>(null);
    const [speeltijdError, setSpeeltijdError] = useState<string | null>(null);
    const [acteursError, setActeursError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  
    const clearErrors = () => {
      setTitelError(null);
      setBeschrijvingError(null);
      setSpeeltijdError(null);
      setActeursError(null);
      setStatusMessages([]);
    };
  
    const validate = (): boolean => {
      let result = true;
  
      if (!titel || titel.trim() === "") {
        setTitelError("Title is required");
        result = false;
      }
      if (!beschrijving || beschrijving.trim() === "") {
        setBeschrijvingError("Description is required");
        result = false;
      }
      if (!speeltijd || speeltijd === 0) {
        setSpeeltijdError("Duration is required");
        result = false;
      }
      if (!acteurs || acteurs.length === 0) {
        setActeursError("Actors are required");
        result = false;
      }
  
      return result;
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      clearErrors();
  
      if (!validate()) {
        return;
      }
  
      const film = { titel, beschrijving, speeltijd, acteurs };
      console.log(film);
      // Submit the form data, e.g. using filmService.createFilm(film);
      // Assume filmService is already imported
  
      const response = await filmService.createFilm(film);
      if (response.status === 200) {
        setStatusMessages([{ message: `Film creation successful.`, type: "success" }]);
      } else {
        const { errorMessage } = await response.json();
        setStatusMessages([{ message: errorMessage, type: "error" }]);
      }
    };
  
    // Function to remove an actor from the list
    const handleActorRemove = (actor: Acteur) => {
      setActeurs((prevActeurs) => prevActeurs.filter((a) => a.id !== actor.id));
    };
  
    return (
      <div className="center form-container">
        <h2 className="center-text">Create Movie</h2>
        {statusMessages && (
          <div className="row">
            <ul className="list-none mb-3 mx-auto ">
              {statusMessages.map(({ message, type }, index) => (
                <li
                  key={index}
                  className={classNames({
                    "text-red-800": type === "error",
                    "text-green-800": type === "success",
                  })}
                >
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-2 fixed-height-big">
            <div>
              <label htmlFor="titelInput" className="block mb-2 text-sm font-medium">
                Titel
              </label>
              <input
                id="titelInput"
                type="text"
                value={titel}
                onChange={(event) => setTitel(event.target.value)}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
              />
              {titelError && <div className="text-red-800">{titelError}</div>}
            </div>
          </div>
          <div className="mt-2 fixed-height-big">
            <label htmlFor="beschrijvingInput" className="block mb-2 text-sm font-medium">
              Beschrijving
            </label>
            <textarea
              id="beschrijvingInput"
              value={beschrijving}
              onChange={(event) => setBeschrijving(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {beschrijvingError && <div className="text-red-800">{beschrijvingError}</div>}
          </div>
          <div className="mt-2 fixed-height-big">
            <label htmlFor="speeltijdInput" className="block mb-2 text-sm font-medium">
              Speeltijd
            </label>
            <input
              id="speeltijdInput"
              type="number"
              onChange={(event) => setSpeeltijd(Number(event.target.value))}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {speeltijdError && <div className="text-red-800">{speeltijdError}</div>}
          </div>
          <div className="mt-2 fixed-height-big">
            <label htmlFor="acteursInput" className="block mb-2 text-sm font-medium">
              Acteurs
            </label>
            <select
                multiple
                id="acteursInput"
                value={acteurs.map((acteur) => acteur.id.toString())}  // Zorg ervoor dat dit een array is van string IDs
                onChange={(event) => {
                    const selectedIds = Array.from(event.target.selectedOptions).map(
                    (option) => option.value
                    );
                    const selectedActors = acteurList.filter((acteur) =>
                    selectedIds.includes(acteur.id.toString())
                    );
                    setActeurs((prevActeurs) => {
                    // Voeg alleen acteurs toe die nog niet in de lijst staan
                    const newActeurs = selectedActors.filter(
                        (acteur) => !prevActeurs.some((a) => a.id === acteur.id)
                    );
                    return [...prevActeurs, ...newActeurs]; // Voeg de nieuwe geselecteerde acteurs toe aan de bestaande lijst
                    });
                }}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                >
                {acteurList.map((acteur) => (
                    <option key={acteur.id} value={acteur.id}>
                    {acteur.voornaam} {acteur.achternaam}
                    </option>
                ))}
                </select>
            {acteursError && <div className="text-red-800">{acteursError}</div>}
          </div>
          <div className="mt-2 fixed-height-big">
            <label className="block mb-2 text-sm font-medium">Selected Acteurs</label>
            <ul>
              {acteurs.map((acteur) => (
                <li key={acteur.id} className="flex justify-between">
                  {acteur.voornaam} {acteur.achternaam}
                  <button
                    type="button"
                    onClick={() => handleActorRemove(acteur)}
                    className="button red-button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="button"
            type="submit"
          >
            Add Movie
          </button>
        </form>
      </div>
    );
  };
  
  export default CreateMovieForm;
  
  
