import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

export async function readProfile(username) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}?_following=true&_followers=true`, {
        headers: headers(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile.");
    }

    return await response.json();
}

export async function readProfiles(limit = 10, page = 1) {
    const response = await fetch(`${API_SOCIAL_PROFILES}?limit=${limit}&page=${page}`, {
        headers: headers(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profiles.");
    }

    return await response.json();
}