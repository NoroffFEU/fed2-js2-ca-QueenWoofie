import { authGuard } from "../../utilities/authGuard";
import { readPost } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";
import { deletePost } from "../../api/post/delete.js";
import { showAlert } from "../../utilities/alertDisplay.js";

authGuard();


const main = document.querySelector("main");
const query = new URLSearchParams(window.location.search);
const postId = query.get("id");

if (!postId) {
    main.innerHTML = "<p>Invalid post ID.</p>";
    throw new Error("No post ID found in URL.");
}

try {
    const { data: post } = await readPost(postId);

    main.innerHTML = `
        <h1>Edit Post</h1>
        <form id="edit-post-form">
        <input type="text" name="title" value="${post.title}" required />
        <textarea name="body" rows="5" required>${post.body}</textarea>
        <input type="url" name="media" placeholder="Media URL" value="${post.media?.url || ""}" />
        <input type="text" name="tags" placeholder="Tags (comma separated)" value="${post.tags.join(", ")}" />
        <button type="submit">Save Changes</button>
        <button id="delete-post">🗑️ Delete Post</button>
        </form>
    `;

    // Edit post
    document.getElementById("edit-post-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value.trim();
        const body = form.body.value.trim();
        const mediaUrl = form.media.value.trim();
        const tags = form.tags.value.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

        const updatedPost = {
            title,
            body,
            tags,
            media: mediaUrl ? { url: mediaUrl, alt: "Updated post image" } : null,
        };

        try {
            await updatePost(postId, updatedPost);
            alert("Post updated successfully!");
            window.location.href = `/post/?id=${postId}`;
        } catch (error) {
            console.error(error);
            showAlert(error.message || "Failed to update post.", "error");
        }
    });

    // Delete post 
    document.getElementById("delete-post").addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            await deletePost(postId);
            alert("Post deleted.");
            window.location.href = "/";
        } catch (error) {
            console.error(error);
            showAlert(error.message || "Failed to delete post.", "error");
        }
    });

} catch (error) {
    console.error(error);
    main.innerHTML = "<p>Failed to load post for editing.</p>";
}