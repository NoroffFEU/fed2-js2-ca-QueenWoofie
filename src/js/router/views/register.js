import { onRegister } from "../../ui/auth/register";

const main = document.querySelector("main");

main.innerHTML = `
    <h1>Register</h1>
    <form name="register" id="register-form">
        <div>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" required maxlength="20" pattern="^[\\w]+$" title="Please enter a name using only letters and numbers" />
        </div>

        <div>
        <label for="email">Email</label>
        <input id="email" type="email" name="email" required pattern="^[\\w\\-.]+@(stud\\.)?noroff\\.no$" title="Please enter a valid noroff.no or stud.noroff.no address" />
        </div>

        <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required minlength="8" />
        </div>

        <div>
        <a href="/auth/login/">Login</a>
        </div>

        <button type="submit">Register</button>
        <div id="register-error"></div>
    </form>
`;

const form = document.forms.register;
form.addEventListener("submit", onRegister);