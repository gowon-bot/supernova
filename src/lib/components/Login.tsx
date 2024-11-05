"use client";

import { callSupernova, setToken } from "@/lib/client/supernova";
import { Token } from "@/lib/database/TokenStore";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Login({
  onLogin,
}: {
  onLogin: (token: Token) => void;
}) {
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await callSupernova("POST", "login", {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    });

    const responseJSON = await response.json();

    if (responseJSON.code) {
      setError(responseJSON.message);
    } else {
      const token = responseJSON.token as Token;

      setError(undefined);
      setToken(token);
      onLogin(token);
    }
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="m-auto pb-[60px]">
          <div className="flex align-middle p-3">
            <Image
              src="/supernova.svg"
              alt="supernova logo"
              width={120}
              height={120}
              priority
            />

            <div className="flex flex-col ml-4">
              <h1 className="text-accent">Supernova</h1>
              <h6 className="text-secondary mt-[-22px]">
                Seek its origin / Bring the light of a dying star
              </h6>
            </div>
          </div>

          <div className="flex justify-center p-3">
            <form onSubmit={(e) => handleLogin(e)}>
              {error && <p className="text-red-500">{error}</p>}

              <div className="mb-2">
                <label className="mr-4" htmlFor="username">
                  Username:
                </label>
                <input type="text" name="username" id="username" />
              </div>

              <div>
                <label className="mr-4" htmlFor="password">
                  Password:
                </label>
                <input type="password" name="password" id="password" />
              </div>

              <button className="mt-4" type="submit">
                Login...
              </button>
            </form>
          </div>
        </div>
      </div>

      <p className="absolute right-2 bottom-2">
        Property of <a href="https://gowon.bot">gowon.bot</a>
      </p>
    </>
  );
}
