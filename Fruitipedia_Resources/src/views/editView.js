import { dataService } from "../dataService.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";

const editTemp = (fruit) => {
  return html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
      <div class="form">
        <h2>Edit Fruit</h2>
        <form class="edit-form" @submit=${submitHandler}>
          <input
            type="text"
            name="name"
            id="name"
            value=${fruit.name}
            placeholder="Fruit Name"
          />
          <input
            type="text"
            name="imageUrl"
            id="Fruit-image"
            value=${fruit.imageUrl}
            placeholder="Fruit Image URL"
          />
          <textarea
            id="fruit-description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
          >
${fruit.description}</textarea
          >
          <textarea
            id="fruit-nutrition"
            name="nutrition"
            placeholder="Nutrition"
            rows="10"
            cols="50"
          >
${fruit.nutrition}</textarea
          >
          <button type="submit">post</button>
        </form>
      </div>
    </section>
  `;
};
let context = null;
export async function showEditView(ctx) {
  context = ctx;
  const data = await dataService.getFruitById(ctx.params.id);
  ctx.render(editTemp(data));
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
  const data = await dataService.editFruit(context.params.id, {
    name,
    imageUrl,
    description,
    nutrition,
  });
  context.goTo(`/details/${context.params.id}`);
}
