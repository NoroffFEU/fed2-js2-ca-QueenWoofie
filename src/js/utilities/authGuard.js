/** 
  @description Auth guard function to check if the user is logged in
*/
export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}