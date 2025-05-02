import { authGuard } from "../../utilities/authGuard";
import { readPosts } from "../../api/post/read.js";
import { renderPosts } from "../../ui/post/renderPosts.js";

authGuard();

const main = document.querySelector("main");

// Filter by tag
const query = new URLSearchParams(window.location.search);
const rawTag = query.get("tag");
const tag = rawTag ? decodeURIComponent(rawTag) : null;

// Posts feed (12 pages pr. load)
let currentPage = 1;
const postsPerPage = 12;
let allPosts = [];

// Load 100 posts if tag is accessed to avoid having to click "Load More" multiple times
async function loadPosts() {
    try {
        const limit = tag ? 100 : postsPerPage;

        const { data: posts } = await readPosts(limit, currentPage);

        allPosts = tag ? [...posts] : [...allPosts, ...posts];

        let filteredPosts = allPosts;

        if (tag) {
            filteredPosts = allPosts.filter(post =>
                post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
            ).slice(0, 12);
        }

        main.innerHTML = `
            ${renderPosts(filteredPosts)}
            ${!tag ? `<button id="load-more">Load More</button>` : ""}
        `;

        if (!tag) {
            const loadMoreButton = document.getElementById("load-more");
            loadMoreButton.addEventListener("click", () => {
                currentPage++;
                loadPosts();
            });
        }
    } catch (error) {
        console.error("Error loading feed:", error);
        main.innerHTML = "<p>Failed to load posts.</p>";
    }
}

loadPosts();