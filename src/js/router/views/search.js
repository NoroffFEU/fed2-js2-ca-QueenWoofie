import { authGuard } from "../../utilities/authGuard.js";
import { readPosts } from "../../api/post/read.js";
import { renderPosts } from "../../ui/post/renderPosts.js";
import { showAlert } from "../../utilities/alertDisplay.js";

authGuard();

const main = document.querySelector("main");

main.innerHTML = `
    <h1>Search Posts</h1>
    <form id="search-form">
        <input type="text" id="search-input" placeholder="Search by title, tag, or author" required />
        <button type="submit">Search</button>
    </form>
    <div id="search-results"></div>
`;

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();

    try {
        const { data: posts } = await readPosts(100);

        const filteredPosts = posts.filter(post => 
            (post.title || "").toLowerCase().includes(query) ||
            (post.body || "").toLowerCase().includes(query) ||
            (post.tags || []).some(tag => tag.toLowerCase().includes(query)) ||
            (post.author?.name || "").toLowerCase().includes(query)
        );

        if (filteredPosts.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
        } else {
        searchResults.innerHTML = renderPosts(filteredPosts);
        }
    } catch (error) {
        console.error(error);
        showAlert(error.message || "Failed to load search results.", "error");
        searchResults.innerHTML = "<p></p>";
    }
});