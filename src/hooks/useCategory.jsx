// import fetchCategoryApi
import {
  allCategory,
  bestDealProduct,
  fetchProductApi,
  individualProduct,
  singleCategoryProductApi,
  totalItems,
} from "@/api/productApiP";
// imort useQuery
import { useQuery } from "@tanstack/react-query";
// for category part
export function useCategory() {
  return useQuery({
    queryKey: ["allproduct"],
    queryFn: fetchProductApi,
  });
}
// for useSingleCategoryProduct
export let useSingleCategoryProduct = (singleProductCategoryName) => {
  return useQuery({
    queryKey: ["category", singleProductCategoryName],
    queryFn: () => singleCategoryProductApi(singleProductCategoryName),
    enabled: !!singleProductCategoryName,
  });
};
// for useBestDealProducts
export let useBestDealProducts = (skip) => {
  return useQuery({
    queryKey: ["dealProduct", skip],
    queryFn: () => bestDealProduct(skip),
  });
};

// for all category list

export let allCategoryList = () => {
  return useQuery({
    queryKey: ["allCategory"],
    queryFn: allCategory,
  });
};

export let useTotalItems = () => {
  return useQuery({
    queryKey: ["totalProductItems"],
    queryFn: totalItems,
  });
};

// get single individual product

export let useGetSingleProduct = (id) => {
  return useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => individualProduct(id),
    enabled: !!id,
  });
};
