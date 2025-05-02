export function renderPosts(posts = []) {
    const profileName = localStorage.getItem("profileName"); // Check if logged in user owns the post - allowing for edit/delete

    return `
        <h1>NOROFF SOCIALS</h1>
        <div id="feed">
            ${posts.map(post => {
                const createdAt = new Date(post.created).toLocaleString();
                return `
                    <div class="post">
                        <h2><a href="/post/?id=${post.id}">${post.title}</a></h2> <!-- 🛠 clickable title -->
                        <p class="author"><strong>By:</strong> <a href="/profile/?user=${post.author.name}">${post.author.name}</a></p>
                        <p class="date"><small>Posted on: ${createdAt}</small></p>
                        <div class="body-container">
                            ${post.media?.url ? `<img src="${post.media.url}" alt="Post media"/>` : ""}
                            <p class="post-body">${post.body}</p>
                        </div>
                        ${post.tags.length ? `
                            <p class="tags"><strong>Tags:</strong> 
                                ${post.tags.map(tag => `<a href="/?tag=${encodeURIComponent(tag)}">#${tag}</a>`).join(", ")}
                            </p>
                        ` : ""}
                        ${post.author.name === profileName ? `
                            <p class="editbutton"><a href="/post/edit/?id=${post.id}">Edit Post</a></p>
                        ` : ""}
                    </div>
                `;
            }).join("")}
        </div>
    `;
}