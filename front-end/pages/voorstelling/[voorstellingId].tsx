import Header from "@/components/Header";
import voorstellingService from "@/service/voorstellingService";
import { StatusMessage, UserStorage, Voorstelling } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/home.module.css";
import classNames from "classnames";
import ticketService from "@/service/ticketService";
import userService from "@/service/userService";

const ReadVoorstellingById = () => {
    const [amount, setAmount] = useState(0);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<UserStorage | null>(null);
    const router = useRouter();
    const { voorstellingId } = router.query;

    useEffect(() => {
      const user = sessionStorage.getItem('loggedInUser');
      setLoggedInUser(user ? JSON.parse(user) : null);
    }, []);

    const clearErrors = () => {
      setStatusMessages([]);
  };


    const getvoorstellingbyId = async () => {
        const voorstellingResponse = await voorstellingService.getVoorstellingById(Number(voorstellingId));
        if (voorstellingResponse.ok) {
            const voorstelling = await voorstellingResponse.json();
            console.log(voorstelling);
            return voorstelling;
        }
    };

    const { data, isLoading, error, mutate } = useSWR("voorstelling", getvoorstellingbyId)

    const handleBuyTicket = async () => {
      if (loggedInUser) {
        console.log(loggedInUser);
        clearErrors();
        
        const ticketsResponses = []; // Array om alle responses op te slaan
        for (let i = 0; i < amount; i++) {
            const ticketResponse = await ticketService.createTicket({
                voorstellingId: Number(voorstellingId),
                userId: loggedInUser.id,
            });
            ticketsResponses.push(ticketResponse);

            // Controleer op fouten na elke poging
            if (!ticketResponse.ok) {
                setStatusMessages([
                    {
                        message: `Failed to buy ticket #${i + 1}.`,
                        type: "error",
                    },
                ]);
                return; // Stop bij een fout
            }
        }
        const voorstellingResponse = await voorstellingService.UpdateVoorstelling({id: Number(voorstellingId), plaatsen: data.plaatsen - amount, filmId: data.film.id, zaalId: data.zaal.id, datum: data.datum, tijdstip: data.tijdstip});
        if (voorstellingResponse.ok) {
            setStatusMessages([{message: `${amount} Ticket(s) bought successfully. redirecting to your tickets`,type: "success",}]);
            mutate(data, false);
            await mutate();
            await new Promise((resolve) => setTimeout(resolve, 1500));
            clearErrors();
            router.push("/myTickets");
        }
      } else {
        setStatusMessages([{message: "User not logged in.", type: "error"}]);
      }
    }

    if (isLoading) {
        return (
          <>
          <Header />
          <main className={styles.main}>
            <p>Loading...</p>
          </main>
        </>
        )
      }
    
      if (error) {
        return (
          <>

          <Header />
          <main className={styles.main}>
            <p>Error: {error}</p>
          </main>
        </>
        )
      }

    return (
        <>
            <Header />
            <main>
                <div className="container flex details-container">
                    <img className="cover-img" src={`/images/cover-${data.film.titel.replace(/ /g, '_')}.jpg`} alt="movie cover" />
                    <div>
                        <div className="details-content">
                            <h1>{data.film.titel}</h1>
                            <p className="details-item">Description: {data.film.beschrijving}</p>
                            <p className="details-item">Lounge: {data.zaal.zaalnummer}</p>
                            <p className="details-item">Duration: {data.film.speeltijd} min</p>
                            <div>
                              amount:  
                              <input onChange={(event) => setAmount(Number(event.target.value))} className="amount-of-ticket" type="number" id="number" min="0" step="1"></input>
                            </div>
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
                            <div className="flex buy-box">
                                <div className="flex buy-info">
                                    <p className="details-item">{new Date(data.datum).toLocaleDateString()}</p>
                                    <p className="details-item">{data.tijdstip}</p>
                                </div>
                                <button className="button-big" onClick={() => handleBuyTicket()} >Buy Ticket(s) ({data.plaatsen} left)</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </main>
        </>
    );
};

export default ReadVoorstellingById;