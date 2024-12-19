import UserService from "@/service/userService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserSignupForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [voornaamError, setVoornaamError] = useState<string | null>(null);
    const [achternaamError, setAchternaamError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setEmailError(null);
        setPasswordError(null);
        setVoornaamError(null);
        setAchternaamError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!email && email.trim() === "") {
            setEmailError("Email is required");
            result = false;
        }

        if (!password && password.trim() === "") {
            setPasswordError("Password is required");
            result = false;
        }

        if (!voornaam && voornaam.trim() === "") {
            setVoornaamError("Voornaam is required");
            result = false;
        }

        if (!achternaam && achternaam.trim() === "") {
            setAchternaamError("Achternaam is required");
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

        const user = { email: email, password: password, voornaam: voornaam, achternaam: achternaam };
        const response = await UserService.createUser(user);

        if (response.status === 200) {
            setStatusMessages([{message: `Signup succesful. Redirecting to login page...`,type: "success",}]);

            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } else if (response.status === 401) {
            const { errorMessage } = await response.json();
            setStatusMessages([{message: errorMessage ,type: "error",}]);
        } else {}
    }

  return (
    <div className="center">
      <h2 className="center-text">Signup</h2>
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
      <div className="mt-2">
          <div>
            <label
              htmlFor="voornaamInput"
              className="block mb-2 text-sm font-medium"
            >
              Voornaam
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="voornaamInput"
              type="text"
              value={voornaam}
              onChange={(event) => setVoornaam(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {voornaamError && (
              <div className=" text-red-800">{voornaamError}</div>
            )}
          </div>
        </div>
        <div className="mt-2">
          <div>
            <label
              htmlFor="achternaamInput"
              className="block mb-2 text-sm font-medium"
            >
              Achternaam
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="achternaamInput"
              type="text"
              value={achternaam}
              onChange={(event) => setAchternaam(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {achternaamError && (
              <div className=" text-red-800">{achternaamError}</div>
            )}
          </div>
        </div>
      <div className="mt-2">
          <div>
            <label
              htmlFor="emailInput"
              className="block mb-2 text-sm font-medium"
            >
              Email
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="emailInput"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {emailError && (
              <div className=" text-red-800">{emailError}</div>
            )}
          </div>
        </div>
        <div className="mt-2">
          <div>
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            />
            {passwordError && (
              <div className=" text-red-800">{passwordError}</div>
            )}
          </div>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
