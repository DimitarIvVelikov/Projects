import { dataService } from "../dataService.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";

const createTemp = () => {
  return html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
      <div class="form">
        <h2>Add Fruit</h2>
        <form class="create-form" @submit=${submitHandler}>
          <input type="text" name="name" id="name" placeholder="Fruit Name" />
          <input
            type="text"
            name="imageUrl"
            id="Fruit-image"
            placeholder="Fruit Image"
          />
          <textarea
            id="fruit-description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
          ></textarea>
          <textarea
            id="fruit-nutrition"
            name="nutrition"
            placeholder="Nutrition"
            rows="10"
            cols="50"
          ></textarea>
          <button type="submit">Add Fruit</button>
        </form>
      </div>
    </section>
  `;
};
let context = null;
export function showCreateView(ctx) {
  context = ctx;
  ctx.render(createTemp());
}

async function submitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { name, imageUrl, description, nutrition } =
    Object.fromEntries(formData);

  if (!name || !imageUrl || !description || !nutrition) {
    alert("All fields are required!");
    return;
  }
  const data = await dataService.createFruit({
    name,
    imageUrl,
    description,
    nutrition,
  });
  context.goTo("/dashboard");
}
