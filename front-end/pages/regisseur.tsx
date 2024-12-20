import Head from "next/head";
import Header from "@/components/Header";
import CreateMovieForm from "@/components/Editing/CreateMovieForm";
import styles from '../styles/home.module.css';
import acteurService from "@/service/acteurService";
import useSWR from "swr";

const Regisseur: React.FC = () => {
    const getActeurs = async () => {
        const acteursResponse = await acteurService.getAllActeurs();
        if (acteursResponse.ok) {
          const films = await acteursResponse.json();
          return films;
        }
      };
    
      const { data, isLoading, error } = useSWR("acteurs", getActeurs);
    
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
            <Head>
                <title>Add Movie</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <CreateMovieForm acteurList={data}/>
                </section>
            </main>
        </>
    )
}

export default Regisseur;