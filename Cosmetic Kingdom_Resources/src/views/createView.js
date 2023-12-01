import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { createHandler } from "../service/products.js";

const main = document.querySelector("main");
const createTemp = () => {
  return html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
      <div class="form">
        <h2>Add Product</h2>
        <form class="create-form" @submit=${createHandler}>
          <input type="text" name="name" id="name" placeholder="Product Name" />
          <input
            type="text"
            name="imageUrl"
            id="product-image"
            placeholder="Product Image"
          />
          <input
            type="text"
            name="category"
            id="product-category"
            placeholder="Category"
          />
          <textarea
            id="product-description"
            name="description"
            placeholder="Description"
            rows="5"
            cols="50"
          ></textarea>

          <input
            type="text"
            name="price"
            id="product-price"
            placeholder="Price"
          />

          <button type="submit">Add</button>
        </form>
      </div>
    </section>
  `;
};

export function createView() {
  render(createTemp(), main);
}