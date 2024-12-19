import Head from "next/head";
import Header from "@/components/Header";
import UserLoginForm from "@/components/users/UserLoginForm";
import UserDemoOverview from "@/components/users/userDemoOverview";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserDemoOverview />
                </section>
            </main>
        </>
    );
};

export default Login;
