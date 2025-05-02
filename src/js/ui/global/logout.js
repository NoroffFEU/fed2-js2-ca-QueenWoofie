export function setLogoutListener() {
    document.body.addEventListener("click", (event) => {
        if (event.target.id === "logout-button") {
            localStorage.clear();
            window.location.href = "/auth/login/";
        }
    });
}