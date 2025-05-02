export function navHeader() {
    const token = localStorage.getItem("token");
    const profileName = localStorage.getItem("profileName");

    return `
        <nav>
            <div class="title">
                <img src="/images/noroff-logo.png" alt="Logo" />
                <h1></h1>
            </div>
            <ul>
                ${token && profileName ? `
                    <li><a href="/">Feed</a></li>
                    <li><a href="/post/create/">Create Post</a></li>
                    <li><a href="/profile/">Profile</a></li>
                    <li><a href="/search/">Search</a></li>
                    <li><button id="logout-button">Logout</button></li>
                ` : `
                    <li><a href="/auth/login/">Login</a></li>
                    <li><a href="/auth/register/">Register</a></li>
                `}
            </ul>
        </nav>
    `;
}