import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const listing = new ProductList("tents", dataSource, listElement);

// Load products when the page opens
await listing.init();

// Search + Filter function
async function updateProducts() {
  const searchText = document
    .querySelector("#search-input")
    .value.trim()
    .toLowerCase();

  const selectedBrand = document.querySelector("#brand-filter").value;

  let products = await dataSource.getData();

  // Filter by brand
  if (selectedBrand !== "") {
    products = products.filter(
      (product) => product.Brand.Name === selectedBrand
    );
  }

  // Search by product name or brand
  if (searchText !== "") {
    products = products.filter(
      (product) =>
        product.Name.toLowerCase().includes(searchText) ||
        product.Brand.Name.toLowerCase().includes(searchText)
    );
  }

  listing.renderList(products);
}

// Search button
document
  .querySelector("#search-button")
  .addEventListener("click", updateProducts);

// Filter dropdown
document
  .querySelector("#brand-filter")
  .addEventListener("change", updateProducts);

// Optional: Search automatically while typing
document
  .querySelector("#search-input")
  .addEventListener("input", updateProducts);