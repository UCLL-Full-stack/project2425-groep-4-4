import UserService from "@/service/userService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserLoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setEmailError(null);
        setPasswordError(null);
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

        return result;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const user = { email: email, password };
        const response = await UserService.loginUser(user);

        if (response.status === 200) {
            setStatusMessages([{message: `Login succesful. Redirecting to homepage...`,type: "success",}]);

            const user = await response.json();
            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    id: user.id,
                    token: user.token,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                })
            )
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else if (response.status === 401) {
            const { errorMessage } = await response.json();
            setStatusMessages([{message: errorMessage ,type: "error",}]);
        } else {}
    }

  return (
    <div className="center form-container">
      <h2 className="center-text">Login</h2>
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
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          Email:
        </label>
        <div className="block mb-2 text-sm font-medium fixed-height">
          <input
            id="emailInput"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && <div className="text-red-800 ">{emailError}</div>}
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
          <div className="block mb-2 text-sm font-medium fixed-height">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && (
              <div className=" text-red-800">{passwordError}</div>
            )}
          </div>
        </div>
        <button
          className="button"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
