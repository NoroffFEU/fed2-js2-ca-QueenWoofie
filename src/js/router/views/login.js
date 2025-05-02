import { onLogin } from "../../ui/auth/login";

const main = document.querySelector("main");

main.innerHTML = `
    <h1>Login</h1>
    <form name="login" id="login-form">
        <div>
        <label for="email">Email</label>
        <input id="email" type="email" name="email" required />
        </div>

        <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
        </div>

        <div>
        <a href="/auth/register/">Register</a>
        </div>
        
        <button type="submit">Login</button>
        <div id="login-error"></div>
    </form>
`;

const form = document.forms.login;
form.addEventListener("submit", onLogin);


