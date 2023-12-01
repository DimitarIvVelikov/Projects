import { dataService } from "../dataService.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";

const dashboardTemp = (data) => {
  return html`
    <!-- Dashboard page -->
    <h2>Fruits</h2>
    <section id="dashboard">
      ${data.length > 0
        ? html`${data.map(fruitCardTemp)}`
        : html`<h2>No fruit info yet.</h2>`}
    </section>
  `;
};

const fruitCardTemp = (fruit) => {
  return html`
    <div class="fruit">
      <img src=${fruit.imageUrl} alt="example1" />
      <h3 class="title">${fruit.name}</h3>
      <p class="description">${fruit.description}</p>
      <a class="details-btn" href=${`/details/${fruit._id}`}>More Info</a>
    </div>
  `;
};

export async function showDashboardView(ctx) {
  let data = await dataService.getAllFruits();
  ctx.render(dashboardTemp(data));
}
