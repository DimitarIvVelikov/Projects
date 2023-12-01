import { render, html } from "../../node_modules/lit-html/lit-html.js";
import * as authService from "../service/auth.js";

const main = document.querySelector("main");

const productsTemp = (data) => {
  return html`
    <!-- Dashboard page -->
    <h2>Products</h2>
    ${data && data.length > 0 ? productSectionTemp(data) : noProductTemp()}
  `;
};

const productSectionTemp = (data) => {
  return html`
    <section id="dashboard">
      <!-- Display a div with information about every post (if any)-->
      ${data.map(productCardTemp)}
    </section>
  `;
};

const productCardTemp = (product) => {
  return html`
    <div class="product">
      <img src=${product.imageUrl} alt="example1" />
      <p class="title">${product.name}</p>
      <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
      <a class="details-btn" href=${`/products/${product._id}`}>Details</a>
    </div>
  `;
};

const noProductTemp = () => {
  return html`
    <!-- Display an h2 if there are no posts -->
    <h2>No products yet.</h2>
  `;
};

export function productsView(ctx) {
  render(productsTemp(ctx.products), main);
}
