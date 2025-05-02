import { API_AUTH_LOGIN } from "../constants.js";

export async function login({ email, password }) {
    const response = await fetch(API_AUTH_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login Response:", data);

    if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Login failed");
    }

    return data;
}
