import page from "./../node_modules/page/page.mjs";
import { authMiddleware } from "./middleware/authMiddleware.js";
import {
  getEditProductDetails,
  getProductDetails,
  getProducts,
} from "./service/products.js";
import { createView } from "./views/createView.js";
import { deleteView } from "./views/deleteView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";
import { navbarView } from "./views/navbar.js";
import { productsView } from "./views/productsView.js";
import { registerView } from "./views/registerView.js";

page(authMiddleware);
page(navbarView);
page("/", homeView);
page("/index.html", homeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logoutView);
page("/products", getProducts, productsView);
page("/create", createView);
page("/products/:id", getProductDetails, detailsView);
page("/edit/:id", getEditProductDetails, editView);
page("/delete/:id", deleteView);
page.start();
