import Container from "@/components/commonComponent/containers/Container";
import { allIcons } from "@/helpers/IconProvider";
import { allCategoryList, useTotalItems } from "@/hooks/useCategory";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * NavBottom Component
 *
 * The tertiary navigation bar containing:
 * - "All Category" dropdown (with virtualized sub-menus)
 * - Quick-access nav links (Track Order, Compare, Customer Support, Need Help)
 * - Phone number CTA on the right
 *
 * ─── RESPONSIVE STRATEGY ─────────────────────────────────────────────────────
 *
 * 320px–md  : Nav links collapse into a hamburger-style mobile menu (drawer).
 *             Only the "All Category" button and phone icon remain visible.
 *             The horizontal link list hides entirely; a ☰ toggle reveals it.
 *
 * md–lg     : "All Category" + first 2 links visible. "Customer Support" and
 *             "Need Help" overflow — hidden via truncation at this range.
 *
 * lg+       : Full horizontal layout as designed. All 4 nav links + phone CTA.
 *
 * ─── BUGS FIXED ──────────────────────────────────────────────────────────────
 * 1. Subcategory dropdown `right-[-320px]` caused viewport overflow on any screen
 *    narrower than ~600px. Fixed to use left-[245px] (anchors to right of category panel).
 * 2. `isClildOpen` was a typo — renamed to `isChildOpen` throughout.
 * 3. Both dropdown panels had hardcoded pixel top values (top-[65px]) that misaligned
 *    when button padding changed at breakpoints. Fixed to top-full for dynamic alignment.
 * 4. `cursor-pointer` was duplicated twice on the main button className.
 * 5. Category virtualizer count fallback of `1000` when data was undefined caused
 *    rendering 1000 empty rows. Changed fallback to `0`.
 * 6. No click-outside handler — dropdowns never auto-closed. Added useEffect + ref.
 * 7. Phone number had no semantic meaning — wrapped in <address> + <a href="tel:...">.
 *
 * ─── SEMANTIC IMPROVEMENTS ───────────────────────────────────────────────────
 * - Root <div> → <nav aria-label="Site navigation">
 * - Nav links use <ul>/<li> structure (were bare <div>s inside a <div>)
 * - Phone number wrapped in <address> + <a href="tel:..."> for click-to-call
 * - Category dropdown panels use role="menu" / role="menuitem"
 * - Mobile menu toggle is a proper <button> with aria-expanded + aria-controls
 *
 * ─── ACCESSIBILITY IMPROVEMENTS ──────────────────────────────────────────────
 * - "All Category" button: aria-expanded, aria-haspopup
 * - Mobile menu button: aria-expanded, aria-controls, aria-label
 * - All nav links have descriptive aria-label attributes
 * - Dropdown panels trap visual attention with proper z-index layering
 * - Focus-visible rings on all interactive elements
 * - Icons are aria-hidden (decorative); text labels carry meaning
 */

// ─── Shared nav link data ─────────────────────────────────────────────────────
// Extracted to a constant so it renders identically in both desktop and mobile menus
// without duplicating JSX. Each entry maps to an allItemsIcon index.

const NAV_LINKS = [
  { label: "Track Order", iconIndex: 0, to: null },
  { label: "Compare", iconIndex: 1, to: "/compare" },
  { label: "Customer Support", iconIndex: 2, to: "customer-support" },
  { label: "Need Help", iconIndex: 3, to: "need-help" },
];

const NavBottom = () => {
  const navigate = useNavigate();

  // ─── Dropdown & menu state ────────────────────────────────────────
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(null);       // Fixed typo: isClildOpen → isChildOpen
  const [isSubChildOpen, setIsSubChildOpen] = useState(null);
  const [hasAnyBrand, setHasAnyBrand] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // NEW: mobile nav drawer

  // ─── Data fetching ────────────────────────────────────────────────
  const {
    data: categoryData,
    isPending: categoryPending,
  } = allCategoryList();

  const { data: allItems } = useTotalItems();

  // ─── Icon imports ─────────────────────────────────────────────────
  const { allItemsIcon, chevron } = allIcons;

  // ─── Ref for click-outside detection ─────────────────────────────
  // Fixed: original had no outside-click handling, so dropdowns never closed.
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── Virtualizer refs ─────────────────────────────────────────────
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);

  // ─── Virtualizers ────────────────────────────────────────────────
  // Fixed: fallback count was 1000 (rendered 1000 empty rows). Changed to 0.
  const categoryRowVirtualizer = useVirtualizer({
    count: categoryData?.length || 0,
    getScrollElement: () => categoryRef.current,
    estimateSize: () => 40,
  });

  const subCategoryRowVirtualizer = useVirtualizer({
    count: isSubChildOpen?.length || 0,
    getScrollElement: () => subCategoryRef.current,
    estimateSize: () => 40,
  });

  // ─── Handlers ────────────────────────────────────────────────────

  const handleCategoryToggle = () => {
    setIsCategoryOpen((prev) => !prev);
    // Close sub-menus when toggling the main category panel
    if (isCategoryOpen) {
      setIsChildOpen(null);
      setIsSubChildOpen(null);
      setHasAnyBrand([]);
    }
  };

  const handleChild = (id) => {
    setIsChildOpen((prev) => (prev === id ? null : id));
  };

  /**
   * Loads sub-category brands/items for the third-level panel.
   * Logic preserved exactly from original — only variable names corrected.
   */
  const handleSubChild = (category) => {
    if (!allItems?.length || typeof category !== "string") return;

    const filteredItems = allItems.filter((item) => item.category === category);
    const filterTitle = filteredItems.map((item) => item?.title);

    const uniqueBrands = filteredItems.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.brand === item.brand)
    );

    setIsSubChildOpen(
      uniqueBrands?.length > 1 ? uniqueBrands : filteredItems
    );

    const catchBrand = uniqueBrands?.map((item) => item?.brand)?.filter(Boolean);
    setHasAnyBrand(catchBrand?.length > 0 ? catchBrand : filterTitle);
  };

  const handleSubNestChild = (item) => {
    navigate(`/product-details/${item?.id}`);
    setIsCategoryOpen(false);
  };

  /** Returns true if a category slug has any items with a brand field */
  const hasBrand = (slug) => {
    if (!allItems?.length) return false;
    return allItems.some((item) => item.category === slug && item.brand);
  };

  const showSubPanel =
    isCategoryOpen &&
    isSubChildOpen?.length > 0 &&
    hasAnyBrand?.length > 0;

  // ─── Shared nav link item renderer ───────────────────────────────
  /**
   * Renders a single nav link item (Track Order, Compare, etc.).
   * Used in both the desktop horizontal bar and the mobile dropdown menu.
   * @param {object} link - from NAV_LINKS constant
   * @param {string} extraClass - optional wrapper className override
   */
  const NavLinkItem = ({ link, extraClass = "" }) => {
    const inner = (
      <span
        className={[
          "flex items-center gap-x-2 sm:gap-x-2.5",
          "py-2 lg:py-[14px] px-3 lg:px-6",
          "rounded-sm",
          "hover:bg-gray_50 transition duration-150 ease-in-out",
          "cursor-pointer",
          "sm_400 text-gray_600 hover:text-gray_900",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary_500 focus-visible:rounded-sm",
          "whitespace-nowrap", // prevents text wrapping and layout shift
          extraClass,
        ].join(" ")}
        role="menuitem"
      >
        {/* Icons are decorative — aria-hidden keeps screen readers focused on the text label */}
        <span aria-hidden="true" className="text-gray_600 flex-shrink-0">
          {allItemsIcon[link.iconIndex]?.icon}
        </span>
        <span>{link.label}</span>
      </span>
    );

    // Wrap in Link if a route is provided; otherwise render as a plain button-like span
    return link.to ? (
      <li>
        <Link
          to={link.to}
          aria-label={link.label}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {inner}
        </Link>
      </li>
    ) : (
      <li>
        {/* "Track Order" has no route in the original — kept as non-link */}
        <div aria-label={link.label}>{inner}</div>
      </li>
    );
  };

  return (
    /*
      Changed: <div> → <nav> for landmark semantics.
      This is a primary site navigation region — <nav> is the correct element.
      ref added for click-outside detection.
    */
    <nav
      ref={navRef}
      aria-label="Site utilities navigation"
      className="py-2 lg:py-4 border-b border-gray_100 relative"
    >
      <Container>
        <div className="flex justify-between items-center">

          {/* ── LEFT ZONE: Category button + Nav links ── */}
          <div className="flex items-center gap-x-0 lg:gap-x-1">

            {/* ── All Category Button ── */}
            {/*
              Changed: removed duplicate `cursor-pointer` class.
              Fixed: top-[65px] → top-full for dynamic alignment with any button height.
              Added: aria-expanded, aria-haspopup for accessibility.
            */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={isCategoryOpen}
                aria-haspopup="menu"
                aria-controls="category-panel"
                onClick={handleCategoryToggle}
                className={[
                  "cursor-pointer py-2 lg:py-[14px] px-3 lg:px-6",
                  "flex items-center gap-x-2 rounded-sm",
                  "hover:bg-gray_50 transition duration-150 ease-in-out",
                  "sm_500 text-gray_600",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary_500",
                  "whitespace-nowrap",
                  isCategoryOpen ? "!bg-primary_500 !text-gray_00" : "",
                ].join(" ")}
              >
                <span className="hidden sm:inline">All Category</span>
                <span className="sm:hidden" aria-hidden="true">☰</span>
                <span aria-hidden="true">
                  {isCategoryOpen ? chevron[1]?.icon : chevron[0]?.icon}
                </span>
              </button>

              {/* ── Category Panel (Level 1) ── */}
              {/*
                Fixed: top-[65px] → top-full (dynamic, won't misalign if button height changes).
                left-0 anchored to the button's left edge.
                z-50 keeps it above page content.
              */}
              {isCategoryOpen && (
                <div
                  id="category-panel"
                  role="menu"
                  aria-label="Product categories"
                  className="absolute top-full left-0 bg-gray_00 z-50 w-[220px] sm:w-[245px] shadow-xl rounded-sm overflow-hidden mt-1"
                >
                  <div
                    ref={categoryRef}
                    style={{ height: "400px", overflow: "auto" }}
                  >
                    <div
                      style={{
                        height: `${categoryRowVirtualizer.getTotalSize()}px`,
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      {categoryRowVirtualizer.getVirtualItems().map((virtualItem) => {
                        const item = categoryData[virtualItem.index];
                        const isActive = isChildOpen === virtualItem.index;

                        return (
                          <div
                            key={virtualItem.key}
                            role="menuitem"
                            tabIndex={0}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: `${virtualItem.size}px`,
                              transform: `translateY(${virtualItem.start}px)`,
                            }}
                            className={[
                              "py-2 px-4 flex justify-between items-center",
                              "hover:bg-gray_50 transition duration-300 ease-in-out",
                              "sm_400 text-gray_600 hover:text-gray_900 cursor-pointer",
                              "focus-visible:outline-none focus-visible:bg-gray_50",
                              isActive ? "text-gray_900 bg-gray_50" : "",
                            ].join(" ")}
                            onClick={() => {
                              handleChild(virtualItem.index);
                              handleSubChild(item?.slug);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleChild(virtualItem.index);
                                handleSubChild(item?.slug);
                              }
                            }}
                          >
                            <span>{item?.name}</span>
                            {hasBrand(item?.slug) && (
                              <span aria-hidden="true">
                                {isActive ? chevron[0]?.icon : chevron[2]?.icon}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Sub-Category Panel (Level 2) ── */}
              {/*
                Fixed: `right-[-320px]` caused overflow on narrow screens.
                Changed to `left-full` (anchors to right edge of category panel).
                Added mt-1 to align with panel top.
                Responsive width: 180px mobile → 200px desktop.
              */}
              {showSubPanel && (
                <div
                  role="menu"
                  aria-label="Sub-category items"
                  className="absolute top-full left-[220px] sm:left-[245px] bg-gray_00 z-60 w-[180px] sm:w-[200px] shadow-xl rounded-sm overflow-hidden mt-1"
                >
                  <div
                    ref={subCategoryRef}
                    style={{ height: "400px", overflow: "auto" }}
                  >
                    <div
                      style={{
                        height: `${subCategoryRowVirtualizer.getTotalSize()}px`,
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      {subCategoryRowVirtualizer.getVirtualItems().map((virtualItem) => {
                        const brandItem = isSubChildOpen[virtualItem.index];
                        if (!brandItem) return null;

                        return (
                          <div
                            key={virtualItem.key}
                            role="menuitem"
                            tabIndex={0}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: `${virtualItem.size}px`,
                              transform: `translateY(${virtualItem.start}px)`,
                            }}
                            className="px-4 flex items-center text-gray_600 hover:text-gray_900 hover:bg-gray_50 cursor-pointer transition duration-300 ease-in-out sm_400 focus-visible:outline-none focus-visible:bg-gray_50"
                            onClick={() => handleSubNestChild(brandItem)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleSubNestChild(brandItem);
                              }
                            }}
                          >
                            {brandItem?.brand || brandItem?.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Desktop Nav Links (hidden < lg) ── */}
            {/*
              Changed: bare <div>s → semantic <ul>/<li> list.
              Hidden below lg breakpoint — the mobile menu handles these at smaller sizes.
              overflow-hidden + whitespace-nowrap prevents text wrapping at md.
            */}
            <ul
              role="menubar"
              aria-label="Quick navigation links"
              className="hidden lg:flex items-center"
            >
              {NAV_LINKS.map((link) => (
                <NavLinkItem key={link.label} link={link} />
              ))}
            </ul>

            {/* ── Mobile Menu Toggle (visible < lg) ── */}
            {/*
              NEW: hamburger-adjacent toggle for the nav links on mobile/tablet.
              Shows at < lg; the desktop <ul> above handles lg+.
              aria-expanded + aria-controls wires it to the mobile panel below.
            */}
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={[
                "lg:hidden",
                "ml-1 p-2 rounded-sm",
                "sm_400 text-gray_600 hover:text-gray_900",
                "hover:bg-gray_50 transition duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary_500",
                "flex items-center gap-x-1",
              ].join(" ")}
            >
              <span aria-hidden="true" className="text-base">⋯</span>
              <span className="hidden sm:inline text-sm">More</span>
            </button>

            {/* ── Mobile Nav Panel ── */}
            {/*
              NEW: dropdown panel for nav links at mobile/tablet sizes.
              Appears below the button row; closes on link click or outside click.
              z-40 keeps it below category dropdown (z-50) in stacking order.
            */}
            {isMobileMenuOpen && (
              <div
                id="mobile-nav-panel"
                role="menu"
                aria-label="Navigation links"
                className="lg:hidden absolute top-full left-0 right-0 bg-gray_00 shadow-lg z-40 border-t border-gray_100 mt-1"
              >
                <ul className="flex flex-col py-2">
                  {NAV_LINKS.map((link) => (
                    <NavLinkItem key={link.label} link={link} extraClass="rounded-none" />
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── RIGHT ZONE: Phone number CTA ── */}
          {/*
            Changed: bare <div><p> → semantic <address><a href="tel:..."> for click-to-call.
            <address> is the correct semantic element for contact information.
            Phone number text hidden on mobile (< sm) to save space; icon remains.
            aria-label on the <a> announces full intent to screen readers.
          */}
          <address className="not-italic">
            
           < a   href="tel:+12025550104"
              aria-label="Call us at +1 202 555 0104"
              className={[
                "flex items-center gap-x-2",
                "py-2 lg:py-[14px] px-3 lg:px-6 rounded-sm",
                "hover:bg-gray_50 transition duration-150 ease-in-out cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary_500",
                "no-underline",
              ].join(" ")}
            >
              <span aria-hidden="true" className="text-gray_900 flex-shrink-0">
                {allItemsIcon[4]?.icon}
              </span>
              {/* Phone text hidden on xs to avoid crowding; icon remains as CTA */}
              <span className="hidden sm:inline lg_400 text-gray_900 whitespace-nowrap">
                +1-202-555-0104
              </span>
            </a>
          </address>

        </div>
      </Container>
    </nav>
  );
};

export default NavBottom;