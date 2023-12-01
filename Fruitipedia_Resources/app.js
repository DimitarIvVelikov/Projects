import page from "./node_modules/page/page.mjs";
import { render } from "./node_modules/lit-html/lit-html.js";
import { userService } from "./src/userService.js";
import { userHelper } from "./src/userHelper.js";
import { showHomeView } from "./src/views/homeView.js";
import { showDashboardView } from "./src/views/dashboardView.js";
import { showLoginView } from "./src/views/loginView.js";
import { showRegisterView } from "./src/views/registerView.js";
import { showCreateView } from "./src/views/createView.js";
import { showSearchView } from "./src/views/searchView.js";
import { showDetailsView } from "./src/views/detailsView.js";
import { showEditView } from "./src/views/editView.js";

const root = document.querySelector("main");
const userNav = document.querySelector(".user"); /*do be determined*/
const guestNav = document.querySelector(".guest");
page(decorationContext);

page("/", showHomeView);
page("/dashboard", showDashboardView);
page("/login", showLoginView);
page("/register", showRegisterView);
page("/create", showCreateView);
page("/search", showSearchView);
page("/details/:id", showDetailsView);
page("/edit/:id", showEditView);

page("/logout", logout);
page.start();
updateNav();

async function logout(ctx) {
  await userService.logout();
  updateNav();
  goTo("/");
}

function renderer(temp) {
  return render(temp, root);
}

function updateNav() {
  const userData = userHelper.getUserData();

  if (userData) {
    userNav.style.display = "block";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "block";
  }
}
function goTo(path) {
  page.redirect(path);
}

function decorationContext(ctx, next) {
  ctx.render = renderer;
  ctx.updateNav = updateNav;
  ctx.goTo = goTo;
  next();
}
