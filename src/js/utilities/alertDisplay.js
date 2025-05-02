/**
 * Temporary alert message display function.
 * Created for customizable purposes.
 * @param {*} message - Chosen mesage to display to the user.
 * @param {*} type - Success or error to display the right style. 
 * @description Displays a cuter error or success message than the default browser one (for 3 seconds).
 */

export function showAlert(message, type = "error") {
    let displayAlert = document.getElementById("error-message");
    
    if (!displayAlert) {
        displayAlert = document.createElement("div");
        displayAlert.id = "error-message";
        document.body.appendChild(displayAlert);
    }
    
    displayAlert.className = `alert-box ${type}`;
    displayAlert.textContent = message;
    displayAlert.style.display = "block";

    setTimeout(() => {
        displayAlert.style.display = "none";
    }, 3000);
}