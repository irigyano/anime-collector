"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <section className="flex justify-center">
      <div className="m-6 p-4 w-96 bg-[#f1f1f1] dark:bg-zinc-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">ログイン</h1>
        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="username"
              className="rounded-lg dark:bg-[#0f0f0f] block w-full p-2.5"
              placeholder="LeBronJames"
              required={true}
            ></input>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              placeholder="••••••••"
              className="rounded-lg dark:bg-[#0f0f0f] block w-full p-2.5"
              required={true}
            ></input>
          </div>

          <button
            type="submit"
            className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Log In
          </button>
          {error && <h1>{error}</h1>}
        </form>
      </div>
    </section>
  );
};
export default LogInPage;
