import { dataService } from "../dataService.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";

const searchTemp = (isSearched, searchResult) => {
  return html`
    <!-- Search page -->
    <section id="search">
      <div class="form">
        <h2>Search</h2>
        <form class="search-form" @submit=${submitHandler}>
          <input type="text" name="search" id="search-input" />
          <button class="button-list">Search</button>
        </form>
      </div>
      <h4>Results:</h4>

      ${!isSearched
        ? ""
        : html` ${searchResult?.length > 0
            ? html`<div class="search-result">
                ${searchResult.map(fruitCardTemp)}
              </div>`
            : html`<p class="no-result">No result.</p>`}`}
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
let context = null;
export function showSearchView(ctx) {
  context = ctx;
  ctx.render(searchTemp(false));
}

async function submitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const search = formData.get("search");
  const searchResult = await dataService.getSearchResult(search);
  context.render(searchTemp(true, searchResult));
}
