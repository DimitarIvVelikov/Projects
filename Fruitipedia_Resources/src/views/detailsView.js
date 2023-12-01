import { dataService } from "../dataService.js";
import { userHelper } from "../userHelper.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";

const detailsTemp = (fruit, isOwner) => {
  return html`
    <!-- Details page -->
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src=${fruit.imageUrl} alt="example1" />
        <p id="details-title">${fruit.name}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p>${fruit.description}</p>
            <p id="nutrition">Nutrition</p>
            <p id="details-nutrition">${fruit.nutrition}</p>
          </div>
          <!--Edit and Delete are only for creator-->
          ${isOwner
            ? html`
                <div id="action-buttons">
                  <a href=${`/edit/${fruit._id}`} id="edit-btn">Edit</a>
                  <a
                    href="javascript:void(0)"
                    @click=${delFruit}
                    id="delete-btn"
                    >Delete</a
                  >
                </div>
              `
            : ""}
        </div>
      </div>
    </section>
  `;
};
let context = null;
export async function showDetailsView(ctx) {
  context = ctx;
  const fruit = await dataService.getFruitById(ctx.params.id);
  const isOwner = fruit._ownerId === userHelper.getUserID();
  ctx.render(detailsTemp(fruit, isOwner));
}

async function delFruit(e) {
  if (confirm("Are you sure you want to delete the item?")) {
    await dataService.deleteFruit(context.params.id);
    context.goTo("/dashboard");
  }
}
