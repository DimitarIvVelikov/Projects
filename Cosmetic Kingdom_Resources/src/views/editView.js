import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { editHandler } from "../service/products.js";

const main = document.querySelector("main");
const editTemp = (product) => {
  return html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
      <div class="form">
        <h2>Edit Product</h2>
        <form class="edit-form" @submit=${(e) => editHandler(e, product._id)}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            value=${product.name}
          />
          <input
            type="text"
            name="imageUrl"
            id="product-image"
            placeholder="Product Image"
            value=${product.imageUrl}
          />
          <input
            type="text"
            name="category"
            id="product-category"
            placeholder="Category"
            value=${product.category}
          />
          <textarea
            id="product-description"
            name="description"
            placeholder="Description"
            rows="5"
            cols="50"
          >
${product.description}</textarea
          >

          <input
            type="text"
            name="price"
            id="product-price"
            placeholder="Price"
            value=${product.price}
          />
          <button type="submit">post</button>
        </form>
      </div>
    </section>
  `;
};

export function editView(ctx) {
  const product = ctx.productEditDetails;
  render(editTemp(product), main);
}
