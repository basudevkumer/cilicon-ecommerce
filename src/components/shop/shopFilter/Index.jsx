import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "@/components/commonComponent/breadcrumb/BreadCrumb";
import Container from "@/components/commonComponent/containers/Container";
import FilterCategoryItems from "../leftPart/FilterCategoryItems";
import {
  allCategoryList,
  useSingleCategoryProduct,
  useTotalItems,
} from "@/hooks/useCategory";
import ProductCard from "@/components/commonComponent/commonProductCard/ProductCard";
import PriceRangeSlider from "../leftPart/PriceRangeSlider";
import ShopCheckBox from "../leftPart/ShopCheckBox";
import PopularTags from "../leftPart/PopularTags";
import PriceRangePresets from "../leftPart/PriceRangePresets";
import RightSideFilter from "../rightPart/RightSearchFilter";
import ProdtRightCont from "../rightPart/ProdtRightCont";
import BestDealProdtBannar from "@/components/commonComponent/bestDeal2/BestDealProdtBannar";
import RightActiveFilter from "../rightPart/RightActiveFilter";
import { useDispatch, useSelector } from "react-redux";
import { globalSearch } from "@/reduxFeature/slices/globalSearchSlice";

const ShopProductFilter = () => {
  const searchItems =
    useSelector((state) => state?.globalSearchItems?.value) || "";
  const dispatch = useDispatch();

  // ── Filter states ────────────────────────────────────────────────
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [pricePresetRange, setPricePresetRange] = useState([0, 0]);
  const [selectedData, setSelectedData] = useState(null);
  const [brand, setBrand] = useState([]);
  const [pTags, setPTags] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [catchActiveValue, setCatchActiveValue] = useState("");

  // ── Mobile sidebar drawer state ──────────────────────────────────
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ── Data fetching ────────────────────────────────────────────────
  const {
    data: categoryData = [],
    isPending: categoryPending,
    isError: categoryError,
  } = allCategoryList();

  const {
    data: singleCategoryProd,
    isPending: singleCategoryLoading,
    isError: singleCategoryError,
  } = useSingleCategoryProduct(selectedData);

  const {
    data: productData,
    isPending: productPending,
    isError: productError,
  } = useTotalItems();

  // ── Derived data ─────────────────────────────────────────────────
  const mainDataSource = useMemo(() => {
    if (selectedData) return singleCategoryProd;
    return productData;
  }, [selectedData, singleCategoryProd, productData]);

  const searchFilteredData = useMemo(() => {
    if (!searchItems.trim()) return mainDataSource;
    const keywords = searchItems.toLowerCase().split(" ").filter(Boolean);
    return mainDataSource?.filter((product) => {
      const text = `
        ${product?.title}
        ${product?.description}
        ${product?.category}
        ${product?.brand}
        ${product?.tags?.join(" ")}
      `.toLowerCase();
      return keywords.every((word) => text.includes(word));
    });
  }, [searchItems, mainDataSource]);

  const filterPrice = useMemo(
    () =>
      searchFilteredData?.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      ),
    [searchFilteredData, priceRange]
  );

  const availableBrand = useMemo(() => {
    const brands = filterPrice?.map((i) => i.brand)?.filter(Boolean);
    return [...new Set(brands)];
  }, [filterPrice]);

  const availableTags = useMemo(() => {
    const tags = filterPrice?.flatMap((i) => i.tags).filter(Boolean);
    return [...new Set(tags)];
  }, [filterPrice]);

  const finalResults = useMemo(() => {
    let data = filterPrice;
    if (brand.length > 0)
      data = data?.filter((b) => brand.includes(b.brand));
    if (pTags)
      data = data?.filter((t) => t.tags?.includes(pTags));
    if (sortBy === "price-asc")
      data = [...(data || [])].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")
      data = [...(data || [])].sort((a, b) => b.price - a.price);
    if (sortBy === "popular")
      data = [...(data || [])].sort((a, b) => b.rating - a.rating);
    return data;
  }, [filterPrice, brand, pTags, sortBy]);

  // ── Side effects ─────────────────────────────────────────────────

  // category change হলে বাকি সব filter reset
  useEffect(() => {
    setBrand([]);
    setPriceRange([0, 100000]);
    setPTags("");
    setPricePresetRange([0, 0]);
    setSortBy("");
    if (!searchItems.trim()) dispatch(globalSearch(""));
  }, [selectedData]);

  useEffect(() => {
    if (brand.length > 0) setPTags("");
  }, [brand]);

  useEffect(() => {
    if (pTags) setBrand([]);
  }, [pTags]);

  useEffect(() => {
    if (pricePresetRange[0] !== 0 || pricePresetRange[1] !== 0)
      setPriceRange(pricePresetRange);
  }, [pricePresetRange]);

  useEffect(() => {
    setPricePresetRange([0, 0]);
  }, [priceRange]);

  // ✅ FIX: search করলে category সহ সব reset
  useEffect(() => {
    if (searchItems.trim()) {
      setBrand([]);
      setPTags("");
      setSelectedData(null);       // ← category reset
      setCatchActiveValue("");      // ← active filter label reset
    }
  }, [searchItems]);

  // ── Close sidebar on ESC ─────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // ── Prevent body scroll when sidebar open ───────────────────────
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // ── Filter Sidebar content ───────────────────────────────────────
  const FilterSidebar = () => (
    <div className="flex flex-col gap-y-0">
      <FilterCategoryItems
        categoryData={categoryData || []}
        categoryPending={categoryPending}
        categoryError={categoryError}
        setCategoryValue={setSelectedData}
        productData={productData}
        selectedValue={selectedData}
        activeFilterValue={setCatchActiveValue}
      />
      <PriceRangeSlider
        value={priceRange}
        onChange={setPriceRange}
        min={0}
        max={100000}
        step={500}
      />
      <div className="pt-5 pb-2 pl-1">
        <PriceRangePresets
          onChanged={setPricePresetRange}
          activePrice={priceRange}
        />
      </div>
      <div className="py-4 sm:py-6">
        <ShopCheckBox
          availableValue={availableBrand}
          selected={brand}
          onChange={setBrand}
        />
      </div>
      <PopularTags
        tagItems={availableTags}
        onClicked={setPTags}
        activeTag={pTags}
      />
      <div className="mt-5 sm:mt-7">
        <BestDealProdtBannar />
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <BreadCrumb />
      </div>

      <div>
        <Container>
          <div className="pt-6 sm:pt-8 lg:pt-[40px] pb-10 sm:pb-14 lg:pb-[72px]">

            {/* ── Mobile: Filter toggle button ── */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h2 className="text-base sm:text-lg font-semibold text-gray_900">
                {finalResults?.length ?? 0} Products
              </h2>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-x-2 px-4 py-2 rounded border border-gray_200 text-sm font-medium text-gray_700 hover:border-primary_500 hover:text-primary_500 transition-colors duration-200 cursor-pointer"
                aria-label="Open filter sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 10h12M10 16h4" />
                </svg>
                Filter
              </button>
            </div>

            {/* ── Mobile: Drawer overlay ── */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
              />
            )}

            {/* ── Mobile: Sidebar drawer ── */}
            <aside
              className={`
                fixed top-0 left-0 h-full w-[300px] sm:w-[340px] bg-white z-50 overflow-y-auto p-5
                transition-transform duration-300 ease-in-out shadow-2xl
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:hidden
              `}
              aria-label="Filter sidebar"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray_900">Filters</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray_500 hover:text-gray_900 text-xl cursor-pointer p-1"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="mt-6 w-full py-3 bg-primary_500 text-white text-sm font-semibold rounded hover:bg-primary_600 transition-colors duration-200 cursor-pointer"
              >
                Apply Filters
              </button>
            </aside>

            {/* ── Main layout: sidebar + products ── */}
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-x-6">

              {/* ── Desktop Sidebar ── */}
              <aside className="hidden lg:block lg:col-span-1" aria-label="Product filters">
                <FilterSidebar />
              </aside>

              {/* ── Product area ── */}
              <div className="lg:col-span-4">
                <RightSideFilter
                  onSort={setSortBy}
                  sortValue={sortBy}
                />
                <div className="pt-3 sm:pt-4">
                  <RightActiveFilter
                    activeValue={catchActiveValue}
                    countfilteredProduct={finalResults || []}
                    searchItems={searchItems}
                  />
                </div>
                <div className="pt-5 sm:pt-6 lg:pt-8 pb-4 sm:pb-6">
                  <ProdtRightCont allFilteredItems={finalResults || []} />
                </div>
              </div>
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
};

export default ShopProductFilter;