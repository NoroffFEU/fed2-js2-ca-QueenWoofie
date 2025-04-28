import { API_KEY } from "./constants";

export function headers() {
  const token = localStorage.getItem("token");
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

headers.append("Content-Type", "application/json");
console.log("Headers:", [...headers.entries()]);

  return headers;
}
