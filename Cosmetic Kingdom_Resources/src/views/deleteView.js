import { deleteProduct } from "../service/products.js";
import page from "./../../node_modules/page/page.mjs";

export async function deleteView(ctx) {
  try {
    debugger;
    const response = await deleteProduct(ctx.params.id);
    console.log(response);
    page.redirect("/products");
  } catch (err) {
    alert("Deletion Failed");
  }
}
