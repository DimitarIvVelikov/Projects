import { render, html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { onDelete } from "../helperFunctions/detailsHelper.js";
import { getAuthData, getProductBoughtStatus } from "../service/auth.js";
import { buyProduct, productBuyCount } from "../service/products.js";

const main = document.querySelector("main");

const detailsTemp = (product, isOwner, isUser, buyCount, buyStatus) => {
  return html`
    <!-- Details page -->
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src=${product.imageUrl} alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
          Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
          Price: <span id="price-number">${product.price}</span>$
        </p>
        <div id="info-wrapper">
          <div id="details-description">
            <h4>Bought: <span id="buys">${buyCount}</span> times.</h4>
            <span>${product.description}</span>
          </div>
        </div>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
          ${isOwner
            ? html`
                <a href=${`/edit/${product._id}`} id="edit-btn">Edit</a>
                <a
                  href=""
                  id="delete-btn"
                  @click=${(e) => {
                    onDelete(e, product._id);
                  }}
                  >Delete</a
                >
              `
            : ""}

          <!--Bonus - Only for logged-in users ( not authors )-->
          ${buyStatus !== null && isUser && !isOwner && !buyStatus
            ? html`<a
                href=""
                id="buy-btn"
                @click=${(e) => {
                  buyProduct(e, product._id);
                }}
                >Buy</a
              >`
            : ""}
        </div>
      </div>
    </section>
  `;
};

export async function detailsView(ctx) {
  const isOwner = ctx.productDetails._ownerId === getAuthData()?._id;
  const isUser = !!getAuthData();
  let buyStatus = null;
  if (isUser) {
    buyStatus = await getProductBoughtStatus(ctx);
  }
  const buyCount = await productBuyCount(ctx.params.id);
  render(
    detailsTemp(ctx.productDetails, isOwner, isUser, buyCount, buyStatus),
    main
  );
}
