import "./css/style.css";

import { navHeader } from "./js/ui/global/header.js";
import { pageFooter } from "./js/ui/global/footer.js";
import { setLogoutListener } from "./js/ui/global/logout.js";

import router from "./js/router";

document.querySelector("header").innerHTML = navHeader();
document.querySelector("footer").innerHTML = pageFooter();
setLogoutListener();

await router(window.location.pathname);
