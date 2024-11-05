"use client";

import React, { useState } from "react";
import { getToken } from "../client/supernova";
import { Token } from "../database/TokenStore";
import Login from "./Login";

export default function ProtectedPage({
  children,
}: React.PropsWithChildren<{}>) {
  const [token, setToken] = useState<Token | undefined>(getToken());

  if (!token) {
    return <Login onLogin={(token) => setToken(token)} />;
  }

  return <div>{children}</div>;
}
