import "./css/style.css";

import { navHeader } from "./js/ui/global/Header.js";
import { setLogoutListener } from "./js/ui/global/logout.js";

import router from "./js/router";

document.querySelector("header").innerHTML = navHeader();
setLogoutListener();

await router(window.location.pathname);
