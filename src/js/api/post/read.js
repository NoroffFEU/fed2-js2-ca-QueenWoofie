import { API_SOCIAL_POSTS } from "../constants.js";
import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// See all posts (feed page)
export async function readPosts(limit = 12, page = 1, tag = "") {
    let url;

    if (tag) {
        url = `${API_SOCIAL_POSTS}?tag=${tag}&limit=${limit}&page=${page}&_author=true&_comments=true&_reactions=true`;
    } else {
        url = `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}&_author=true&_comments=true&_reactions=true`;
    }

    const response = await fetch(url, {
        headers: headers(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Failed to fetch posts.");
    }

    return await response.json();
}

// See all posts by a user (profile page)
export async function readPostsByUser(username, limit = 12, page = 1, tag = "") {
    let url = `${API_SOCIAL_PROFILES}/${username}/posts?limit=${limit}&page=${page}&_author=true&_comments=true&_reactions=true`;

    if (tag) {
        url = `${API_SOCIAL_PROFILES}/${username}/posts?tag=${tag}&limit=${limit}&page=${page}&_author=true&_comments=true&_reactions=true`;
    }

    const response = await fetch(url, {
        headers: headers(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Failed to fetch user's posts.");
    }

    return await response.json();
}


// Single post
export async function readPost(id) {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true&_comments=true&_reactions=true`, {
        headers: headers(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Failed to fetch post.");
    }

    return await response.json();
}