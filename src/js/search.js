import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

export async function searchProducts(searchText) {
  const products = await dataSource.getData();

  return products.filter((product) => {
    return (
      product.Name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.Brand.Name.toLowerCase().includes(searchText.toLowerCase())
    );
  });
}