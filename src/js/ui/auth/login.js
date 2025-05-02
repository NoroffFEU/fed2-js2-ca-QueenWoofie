import { login } from "../../api/auth/login.js";
import { readProfile } from "../../api/profile/read.js";
import { showAlert } from "../../utilities/alertDisplay.js";

/**
 * Login function.
 * Sends login credentials to the API, stores token and name (username), and redirects to profile.
 * Displays a custom error message if login fails.
 *
 * @param {Event} event - Submits the login form.
 */

export async function onLogin(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
        const { data } = await login({ email, password });

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("profileName", data.name);

        window.location.href = "/profile/";

    } catch (error) {
        console.error("Login error:", error);
        showAlert(error.message || "Login failed.", "error");
    }
}