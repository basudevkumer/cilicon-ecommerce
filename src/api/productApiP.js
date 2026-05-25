import { instance } from "./axios";

// get all product
export async function fetchProductApi() {
  try {
    const respons = await instance.get("/products");
    return respons.data.products;
  } catch (error) {
    console.error("Fetch Error is :" + error);
    throw error;
  }
}
// get single category product  list by according  to category
export let singleCategoryProductApi = async (productCategoryName = "") => {
  try {
    const productItemsRespons = await instance.get(
      `products/category/${productCategoryName}`
    );

    return productItemsRespons.data.products;
  } catch (error) {
    console.error("SingleProduct Error is : " + error);
    throw error;
  }
};

// get best deal products list....

export let bestDealProduct = async (skip = 0) => {
  try {
    let dealProductElement = await instance.get(
      `/products?limit=12&skip=${skip}&select=title,price,thumbnail,description`
    );
    return dealProductElement.data.products;
  } catch (error) {
    console.error("Best Deal Product Error is" + error);
    throw error;
  }
};

// get all category list

export let allCategory = async () => {
  try {
    let allCategoryProdResponse = await instance.get("/products/categories");
    return allCategoryProdResponse.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get total (194) api data

export let totalItems = async () => {
  try {
    let totalProductITems = await instance.get("/products?limit=194");
    return totalProductITems.data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get single individual product

export let individualProduct = async (id) => {
  try {
    const respons = await instance.get(`/products/${id}`);
    return respons.data;
  } catch (error) {
    console.error("Fetch Error is :" + error);
    throw error;
  }
};
