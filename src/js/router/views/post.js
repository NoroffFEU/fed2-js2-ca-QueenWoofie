import { authGuard } from "../../utilities/authGuard.js";
import { readPost } from "../../api/post/read.js";
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

// Get single post
try {
    const { data: post } = await readPost(postId);

    const createdAt = new Date(post.created).toLocaleString();

    main.innerHTML = `
        <div class="single-post">
            <div class="single-post-header">
                <h1>${post.title}</h1>
                <p class="author"><strong>By:</strong> <a href="/profile/?user=${post.author.name}">${post.author.name}</a></p>
            </div>
            <p class="date"><small>Posted on: ${createdAt}</small></p>
            <div class="single-body-container">
                ${post.media?.url ? `<img src="${post.media.url}" alt="Post media"/>` : ""}
                <p class="post-body">${post.body}</p>
            </div>
            ${post.tags.length ? `
            <p class="tags"><strong>Tags:</strong> 
                ${post.tags.map(tag => `<a href="/?tag=${encodeURIComponent(tag)}">#${tag}</a>`).join(", ")}
            </p>
            ` : ""}
            ${post.author.name === localStorage.getItem("profileName") ? `
                <p class="post-buttons">
                    <a class="single-editbutton" href="/post/edit/?id=${post.id}">✎ Edit</a>
                    <button id="delete-post">🗑️ Delete</button>
                </p>            
            ` : ""}
            <button class="back-button" onclick="window.history.back()">Back</button>
        </div>
    `;
    // Delete post
    if (post.author.name === localStorage.getItem("profileName")) {
        const deleteButton = document.getElementById("delete-post");

        deleteButton.addEventListener("click", async () => {
            const confirmDelete = confirm("Are you sure you want to delete this post?");
            if (!confirmDelete) return;

            try {
                await deletePost(post.id);
                alert("Post deleted!");
                window.location.href = "/";
            } catch (error) {
                console.error(error);
                showAlert(error.message || "Failed to delete post.", "error");
            }
        });
    }
} catch (error) {
    console.error("Post not found or failed to load:", error);
    window.history.replaceState(null, "", "/not-found/");
    await import("./notFound.js");
}