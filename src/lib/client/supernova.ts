import { apiURL } from "@/secrets";
import { Token } from "../database/TokenStore";

export async function callSupernova(
  method: "POST",
  path: string,
  body: any
): Promise<Response>;
export async function callSupernova(
  method: "GET",
  path: string
): Promise<Response>;
export async function callSupernova(
  method: "POST" | "GET",
  path: string,
  body?: any
): Promise<Response> {
  const uri = apiURL + "/api/" + path;

  const token = getToken();

  const headers: HeadersInit = token
    ? {
        Authorization: `Bearer ${token.token}`,
      }
    : {};

  if (method === "GET") {
    return fetch(uri, { method, headers });
  } else {
    return fetch(uri, {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}

export function setToken(token: Token) {
  localStorage.setItem("token", token.token);
  localStorage.setItem("userID", token.userID);
}

export function getToken(): Token | undefined {
  if (typeof window === "undefined") {
    // Return undefined if running on the server
    return undefined;
  }

  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");

  if (!token || !userID) {
    return undefined;
  }

  return { token, userID };
}
