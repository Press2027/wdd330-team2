import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { searchProducts } from "./search.js";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const listing = new ProductList("tents", dataSource, listElement);

await listing.init();

document
  .querySelector("#search-button")
  .addEventListener("click", async () => {
    const text = document.querySelector("#search-input").value.trim();

    if (text === "") {
      listing.init();
      return;
    }

    const results = await searchProducts(text);
    listing.renderList(results);
  });