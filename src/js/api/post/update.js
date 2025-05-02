import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function updatePost(id, { title, body, tags = [], media = null }) {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ title, body, tags, media }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Failed to update post.");
    }

    return await response.json();
}