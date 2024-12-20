import Head from "next/head";
import Header from "@/components/Header";
import styles from "@/styles/home.module.css";
import useSWR from "swr";
import ticketService from "@/service/ticketService";
import { useEffect, useState } from "react";
import { Ticket, UserStorage } from "@/types";

const myTickets: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserStorage | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    setLoggedInUser(user ? JSON.parse(user) : null);
  }, []);

  const getTickets = async () => {
    if (!loggedInUser) {
      throw new Error("User is not logged in");
    }
    const ticketsResponse = await ticketService.getTicketsByUser(loggedInUser.id);
    if (ticketsResponse.ok) {
      const tickets = await ticketsResponse.json();
      console.log(tickets);
      return tickets;
    }
  };

  const { data, isLoading, error } = useSWR("films", getTickets);
  console.log(data);

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

  if (!loggedInUser) {
    return <p>Loading user...</p>;
  }

  if (!data) {
    return (
      <>
      <Header />
      <main className={styles.main}>    
        <p>Loading tickets...</p>
      </main>
    </>
    )
  }

  if (error) {
    return (
      <>

      <Header />
      <main className={styles.main}>
        <p>Error: {error.message}</p>
      </main>
    </>
    )
  }

    return (
        <>
            <Head>
                <title>My Tickets</title>
            </Head>
            <Header />
            <main className={styles.main}>
                  {data?.length === 0 ? (
                    <p>No tickets yet.</p>
                  ) : (
                    data.map((ticket: Ticket) => (
                      <div key={ticket.id} className='flex admin-item-container'>
                        <div className='item-info'>
                          <p>{ticket.voorstelling.film.titel}</p>
                          <p>Date: {new Date(ticket.voorstelling.datum).toLocaleDateString()}</p>
                          <p>Time: {ticket.voorstelling.tijdstip}</p>
                          <p>Duration: {ticket.voorstelling.film.speeltijd} min</p>
                        </div>
                      </div>
                    ))
                  )}
            </main>
        </>
    )
}

export default myTickets;