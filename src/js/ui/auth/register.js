import { register } from "../../api/auth/register.js";
import { showAlert } from "../../utilities/alertDisplay.js";

/**
 * Registration function.
 * Sends user data to the API and redirects to login on success.
 * Displays custom error (from alertDisplay) message on failure.
 *
 * @param {Event} event - Submits the registation form.
 */

export async function onRegister(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
        const { data } = await register({ name, email, password });
        
        showAlert("Registration successful! Redirecting to login...", "success");
        setTimeout(() => {
            window.location.href = "/auth/login/";
        }, 3000);
    
    } catch (error) {
        console.error("Registration error:", error);
        showAlert(error.message || "Registration failed.", "error");
    }
}