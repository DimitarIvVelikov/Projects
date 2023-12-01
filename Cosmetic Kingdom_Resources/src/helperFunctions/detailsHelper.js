import page from "./../../node_modules/page/page.mjs";

export function onDelete(e, id) {
  e.preventDefault();
  if (confirm("Are you sure you want to delete the item?")) {
    page.redirect(`/delete/${id}`);
  }
}
