import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function deletePost(id) {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        method: "DELETE",
        headers: headers(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Failed to delete post.");
    }

    return true;
}