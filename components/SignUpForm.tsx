"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // pw not matched
      setError("Password Unmatched");
      return;
    }

    if (error) {
      setError("");
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        signIn();
      } else {
        setError((await res.json()).error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center">
      <div className="m-6 p-4 w-96 bg-[#f1f1f1] dark:bg-zinc-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">註冊</h1>
        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              使用者名稱
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
              密碼
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
          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">
              確認密碼
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className="rounded-lg dark:bg-[#0f0f0f] block w-full p-2.5"
              required={true}
            ></input>
          </div>

          <button
            type="submit"
            className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            建立帳號
          </button>
          {error && <h1 className="text-lg text-red-600">{error}</h1>}
          <p className="text-sm font-light">
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              已經有帳號了？
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
export default SignUpForm;
