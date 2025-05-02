import { authGuard } from "../../utilities/authGuard.js";
import { createPost } from "../../api/post/create.js";
import { headers } from "../../api/headers.js";
import { showAlert } from "../../utilities/alertDisplay.js";

authGuard();

const main = document.querySelector("main");

main.innerHTML = `
  <h1>Create New Post</h1>
  <form id="create-post">
    <input type="text" name="title" placeholder="Post Title" required />
    <textarea name="body" placeholder="Post Body" rows="5" required></textarea>
    <input type="url" name="media" placeholder="Image/Media URL (optional)" />
    <input type="text" name="tags" placeholder="Tags (comma separated)" />
    <button type="submit">Create Post</button>
  </form>
`;

/** 
 * Creates a new post using the form data.
 */

document.getElementById("create-post").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const title = form.title.value.trim();
  const body = form.body.value.trim();
  const mediaUrl = form.media.value.trim();
  const tags = form.tags.value.split(",").map(tag => tag.trim()).filter(tag => tag !== ""); // Split tags by comma, allow clicking tags with space in between, i.e "Hello Class"

  const postData = {
    title,
    body,
    tags,
    media: mediaUrl ? { url: mediaUrl, alt: "Post media" } : null
  };

  console.log("Post data being sent:", postData);

  try {
    showAlert("Post created successfully!", "success");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } catch (error) {
    console.error(error);
    showAlert(error.message || "Failed to create post.", "error");
  }
});
