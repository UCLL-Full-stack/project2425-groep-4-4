import Head from "next/head";
import Header from "@/components/Header";
import UserSignupForm from "@/components/users/UserSignupForm";

const Signup: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserSignupForm />
                </section>
            </main>
        </>
    )
}

export default Signup;