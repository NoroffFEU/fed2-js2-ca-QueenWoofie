import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Follow a user
export async function followUser(username) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/follow`, {
        method: "PUT",
        headers: headers(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Failed to follow user.");
    }

    return await response.json();
}

// Unfollow a user
export async function unfollowUser(username) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/unfollow`, {
        method: "PUT",
        headers: headers(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Failed to unfollow user.");
    }

    return await response.json();
}