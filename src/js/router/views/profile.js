import { authGuard } from "../../utilities/authGuard";
import { readProfile } from "../../api/profile/read.js";
import { readPostsByUser } from "../../api/post/read.js";
import { followUser, unfollowUser } from "../../api/profile/follow.js";
import { headers } from "../../api/headers.js";
import { showAlert } from "../../utilities/alertDisplay.js";

authGuard();

/**
    * Determines if the profile being viewed belongs to the user thats logged in or another user.
    * If it's the logged-in user's profile, it allows them to update their profile information.
    * Also sets up follow/unfollow and profile update functionality if it's another user's profile.
*/

// Accessing other user's profile
const query = new URLSearchParams(window.location.search);
const userFromUrl = query.get("user");

// Access own profile if no user is specified in the URL
const username = userFromUrl || localStorage.getItem("profileName");
const isOwnProfile = !userFromUrl || userFromUrl === localStorage.getItem("profileName"); // Remove editorial options on other users' profiles

if (!username) {
    window.location.href = "/auth/login/";
}

try {
    const {data: profile } = await readProfile(username);

    const avatar = profile.avatar?.url && profile.avatar.url.trim() !== ""
        ? profile.avatar.url
        : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTE2OTU0MC1pbWFnZS1rd3Z5NHFtei5qcGc.jpg";

    const banner = profile.banner?.url && profile.banner.url.trim() !== ""
        ? profile.banner.url
        : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTE2OTU0MC1pbWFnZS1rd3Z5NHFtei5qcGc.jpg";


    const main = document.querySelector("main");

    main.innerHTML = `
        <h1>${profile.name}'s Profile</h1>
        <img src="${banner}" alt="Banner" style="width: 100%; height: auto; max-height: 200px; max-width: 600px; border-radius: 8px; margin-bottom: 1rem;" />
        <img src="${avatar}" alt="Avatar" width="100" style="border-radius: 50%;" />
        <p>${profile.bio}</p>
        <p>Email: ${profile.email}</p>

        <button id="followers-button">Followers (${profile.followers.length})</button>
        <button id="following-button">Following (${profile.following.length})</button>
        <div id="popup-container" style="display:none;">
            <button id="close-popup">Close</button>
            <div id="popup-content"></div>
        </div>

    ${isOwnProfile ? `
        <form id="update-profile">
            <input type="url" name="avatar" placeholder="New avatar URL" />
            <input type="url" name="banner" placeholder="New banner URL" />
            <textarea name="bio" placeholder="Enter a short bio" rows="3" style="resize: none;"></textarea>
            <button type="submit">Update Changes</button>
        </form>
    ` : ""}

    ${!isOwnProfile ? `
        <div id="follow-section">
            <button id="follow-button">Loading...</button>
        </div>
    ` : ""}

    <h2>${isOwnProfile ? "Your Posts" : `${profile.name}'s Posts`}</h2>
    <div id="user-feed"></div>

        <button id="logout">Logout</button>
    `;
    // Follow / Followers popup
    const followersButton = document.getElementById("followers-button");
    const followingButton = document.getElementById("following-button");
    const popupContainer = document.getElementById("popup-container");
    const popupContent = document.getElementById("popup-content");
    const closePopup = document.getElementById("close-popup");


    followersButton.addEventListener("click", () => {
        popupContent.innerHTML = `
            <h3>Followers</h3>
            <ul>
                ${profile.followers.length ? profile.followers.map(follower => `
                <li><a href="/profile/?user=${follower.name}">${follower.name}</a></li>
                `).join("") : "<p>No followers yet.</p>"}
            </ul>
        `;
        popupContainer.style.display = "block";
    });

    followingButton.addEventListener("click", () => {
        popupContent.innerHTML = `
            <h3>Following</h3>
            <ul>
                ${profile.following.length ? profile.following.map(followed => `
                <li><a href="/profile/?user=${followed.name}">${followed.name}</a></li>
                `).join("") : "<p>Not following anyone yet.</p>"}
            </ul>
        `;
        popupContainer.style.display = "block";
    });

    closePopup.addEventListener("click", () => {
        popupContainer.style.display = "none";
    });
} catch (error) {
    console.error("Error loading profile:", error);
    showAlert("Failed to load profile. Please try again later.", "error");
}

// Check if the user is already followed
if (!isOwnProfile) {
    const { data: myProfile } = await readProfile(localStorage.getItem("profileName"));

    const isFollowing = myProfile.following?.some(followed => followed.name === username) || false;

    const followButton = document.getElementById("follow-button");
    followButton.textContent = isFollowing ? "Unfollow" : "Follow";

    followButton.addEventListener("click", async () => {
        try {
            if (followButton.textContent === "Unfollow") {
            await unfollowUser(username);
            followButton.textContent = "Follow";
            } else {
            await followUser(username);
            followButton.textContent = "Unfollow";
            }
        } catch (error) {
            console.error(error);
            showAlert("Failed to update follow status. Please try again.", "error");
        }
    });
}

/**
    * Sumbits profile updates.
    * Updates avatar, banner, and bio and reloads page on success.
*/

document.body.addEventListener("submit", async (event) => {
    if (event.target.id === "update-profile") {
        event.preventDefault();
        const form = event.target;
        const newAvatar = form.avatar.value.trim();
        const newBanner = form.banner.value.trim();
        const newBio = form.bio.value.trim();

// Change profile - Bio, Avatar and Banner
    try {
        const { data: currentProfile } = await readProfile(username);

        const updatedProfile = {
            name: currentProfile.name,
            email: currentProfile.email,
            bio: newBio !== "" ? newBio : (currentProfile.bio ?? ""),
            avatar: {
                url: newAvatar !== "" ? newAvatar : (currentProfile.avatar?.url ?? ""),
                alt: "User avatar"
            },
            banner: {
                url: newBanner !== "" ? newBanner : (currentProfile.banner?.url ?? ""),
                alt: "User banner"
            }
        };

        console.log("Sending updated profile:", updatedProfile);

        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${username}`, {
            method: "PUT",
            headers: headers(),
            body: JSON.stringify(updatedProfile),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server response error:", errorData);
            throw new Error("Profile update failed");
        }

            showAlert("Profile updated! Refreshing...", "success");
            setTimeout(() => {
                location.reload();
            }, 3000);
        } catch (error) {
            console.error(error);
            showAlert(error.message || "Profile update failed", "error");
        }
    }
});

// Profile feed (both on personal and other users' profiles)
try {
    const { data: posts } = await readPostsByUser(username);
    const userFeed = document.getElementById("user-feed");

    userFeed.innerHTML = posts.map(post => `
        <div class="post">
            <h3>
                <a href="/post/?id=${post.id}">${post.title}</a>
                ${post.author.name === localStorage.getItem("profileName") ? `<a href="/post/edit/?id=${post.id}"> ✎ Edit</a>` : ""}
            </h3>
            <p>${post.body}</p>
            ${post.media?.url ? `<img src="${post.media.url}" alt="Post media" style="width: 100%; height: auto; margin: 1rem 0;" />` : ""}
            ${post.tags.length ? `
                <p><strong>Tags:</strong> 
                    ${post.tags.map(tag => `<a href="/?tag=${tag}">#${tag}</a>`).join(", ")}
                </p>
            ` : ""}
        </div>
    `).join("");
} catch (error) {
    console.error("Error loading user's posts:", error);
    showAlert("Failed to load user's posts. Please try again later.", "error");
}

// Logout button
document.body.addEventListener("click", (event) => {
    if (event.target.id === "logout") {
        localStorage.clear();
        window.location.href = "/auth/login/";
    }
});