import { API_AUTH_REGISTER } from "../constants.js";

export async function register({ name, email, password }) {
  const response = await fetch(API_AUTH_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Registration failed");
  }

  return await response.json();
}