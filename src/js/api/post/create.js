import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function createPost({ title, body, tags = [], media = "" }) {
    const response = await fetch(API_SOCIAL_POSTS, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ title, body, tags, media }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Failed to create post.");
    }

    return await response.json();
}