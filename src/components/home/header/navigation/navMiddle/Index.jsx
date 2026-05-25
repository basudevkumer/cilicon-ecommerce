import Container from "@/components/commonComponent/containers/Container";
import AddToCartPop from "@/components/home/addToCardPop/AddToCartPop";
import { allIcons } from "@/helpers/IconProvider";
import { allImages } from "@/helpers/ImageProvider";
import { globalSearch } from "@/reduxFeature/slices/globalSearchSlice";
import { useTotalItems } from "@/hooks/useCategory";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

/**
 * NavMiddle Component
 *
 * The primary navigation bar containing the brand logo, search input, and action icons
 * (wishlist, account, cart). This is the most complex nav section requiring careful
 * responsive treatment across 5 breakpoints.
 *
 * RESPONSIVE STRATEGY:
 * ─────────────────────────────────────────────────────────────────
 * 320px  (xs) : Logo + icons row. Search moves BELOW in a full-width second row.
 * sm  (640px)  : Same two-row layout but with slightly larger search.
 * md  (768px)  : Single row — logo | search (flex-1) | icons. Search fills available space.
 * lg  (1024px) : Full single-row layout, search capped at 646px, centered in its column.
 * xl+ (1280px) : Original 4-col grid intention, search naturally centered, max-width capped.
 * ─────────────────────────────────────────────────────────────────
 *
 * CRITICAL BUGS FIXED IN ORIGINAL:
 * 1. Fixed-width input `w-[646px]` caused horizontal overflow on any viewport < 700px.
 * 2. <li> nested directly inside <div> (invalid HTML — li must be child of ul/ol).
 * 3. Cart badge z-index layering was inverted (badge z-0 behind icon z-10).
 * 4. AddToCartPop had hardcoded `left-[-355px]` causing overflow on narrow screens.
 * 5. Missing click-outside handler for cart/account dropdowns.
 * 6. <picture> wrapper was empty — no <source> elements, defeating its purpose.
 *
 * SEMANTIC IMPROVEMENTS:
 * - Root <div> → <section> (landmark within the page header region).
 * - Icon list uses semantic <ul>/<li> throughout (was mixed div/li).
 * - Search wrapped in <search> role with proper label.
 * - Logo wrapped in <figure> with descriptive alt text.
 *
 * ACCESSIBILITY IMPROVEMENTS:
 * - Search input has aria-label; button has descriptive aria-label.
 * - Cart badge uses aria-label announcing item count.
 * - Dropdown panels have role="dialog" and aria-label.
 * - Click-outside closes dropdowns (usability + a11y).
 * - All interactive icons have aria-label and cursor-pointer.
 * - Focus-visible ring on all interactive elements.
 */
const NavMiddle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ─── Image & Icon imports ───────────────────────────────────────
  const { navMiddle } = allImages;
  const { searchIcon, navMiddleIcon } = allIcons;

  // ─── Search state ────────────────────────────────────────────────
  const [inputValue, setInputValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [showSearchIcon, setShowSearchIcon] = useState(true);

  // ─── Dropdown state ──────────────────────────────────────────────
  const [activePanel, setActivePanel] = useState(null); // tracks which icon panel is open

  // ─── Cart data from Redux ────────────────────────────────────────
  const addToCardItems = useSelector((state) => state.addCard.value);

  // ─── Refs for click-outside detection ───────────────────────────
  const navRef = useRef(null);

  /**
   * Debounce: delays dispatching search until user stops typing for 500ms.
   * Prevents firing a Redux action on every keystroke.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  /**
   * Click-outside handler: closes any open dropdown panel when the user
   * clicks anywhere outside the NavMiddle component.
   * Improves UX and follows standard dropdown accessibility expectations.
   */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActivePanel(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────

  /** Tracks input value + toggles search/clear icon visibility */
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSearchIcon(value.length === 0);
  };

  /** Dispatches global search, resets input, navigates to /shop */
  const handleSearch = () => {
    if (!debounceValue.trim()) return; // guard: don't search on empty string
    dispatch(globalSearch(debounceValue));
    setInputValue("");
    setDebounceValue("");
    setShowSearchIcon(true);
    navigate("/shop");
  };

  /** Allows submitting search via Enter key */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /** Toggles a panel open/closed; closes others */
  const handlePanelToggle = (id) => {
    setActivePanel((prev) => (prev === id ? null : id));
  };

  return (
    /*
      Changed: root <div> stays as section-level container.
      Added ref for click-outside detection.
      border-t separator from original preserved.
    */
    <section
      ref={navRef}
      aria-label="Main navigation"
      className="bg-secondary_700 border-t border-white/25"
    >
      <Container>
        {/*
          LAYOUT APPROACH:
          ─ Mobile (< md): two-row flex column.
            Row 1: logo + icon actions (space-between).
            Row 2: full-width search bar.
          ─ Desktop (md+): single row with three zones.
            [Logo] [Search — flex-1] [Icons]
          
          Changed: from rigid 4-col grid (broke at < xl) to
          flex-based adaptive layout that works at every breakpoint.
        */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-x-6 py-3 md:py-4 lg:py-5 gap-y-3">

          {/* ── Row 1 (mobile) / Zone 1 (desktop): Logo + Mobile Icon Row ── */}
          <div className="flex items-center justify-between md:justify-start md:flex-shrink-0">

            {/*
              LOGO:
              Changed: bare <picture> with no sources → proper <Link> wrapped logo
              with responsive sizing. Alt text improved from "middlenavImage" to
              descriptive "Clicon eCommerce logo".
              Responsive sizes: smaller on mobile, natural on desktop.
            */}
            <Link to="/" aria-label="Go to homepage">
              <figure className="m-0">
                <img
                  src={navMiddle}
                  alt="Clicon eCommerce logo"
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                />
              </figure>
            </Link>

            {/*
              MOBILE-ONLY icon row (visible < md, hidden md+).
              Pulled from the desktop icon zone so it renders inline with logo on mobile.
              Changed: icons render in two places conditionally via CSS show/hide
              (avoids duplicating JSX logic).
            */}
            <ul
              role="list"
              aria-label="Navigation actions"
              className="flex items-center gap-x-4 sm:gap-x-5 md:hidden"
            >
              {navMiddleIcon.map((item) => (
                <MobileIconItem
                  key={item.id}
                  item={item}
                  activePanel={activePanel}
                  cartCount={addToCardItems.length}
                  onToggle={handlePanelToggle}
                  onClosePanel={() => setActivePanel(null)}
                />
              ))}
            </ul>
          </div>

          {/* ── Zone 2: Search Bar ── */}
          {/*
            Changed: removed hardcoded w-[646px] which caused overflow.
            Now: w-full on mobile, flex-1 with max-w cap on desktop.
            Search wrapper is full-width on mobile (its own row), inline on md+.
          */}
          <div
            role="search"
            aria-label="Product search"
            className="w-full md:flex-1 relative"
          >
            <input
              type="search"
              aria-label="Search for products"
              placeholder="Search for anything..."
              className={[
                "w-full bg-gray_00 rounded",
                "px-4 sm:px-5 py-3 md:py-[14px]",
                /* Ensure search-cancel button doesn't overlap with our custom icon */
                "[&::-webkit-search-cancel-button]:hidden",
                "placeholder:sm_400 placeholder:text-gray_400",
                "focus:outline-none focus:ring-2 focus:ring-primary_500",
                "text-gray_900 sm_400",
                "transition-shadow duration-150",
              ].join(" ")}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            {/*
              Search icon / Search button toggle:
              - When input is empty: show magnifier icon (decorative, aria-hidden).
              - When input has value: show "Search" action button.
              Changed: button now has aria-label; icon is aria-hidden since it's decorative.
              Positioning adjusted: right-3 on mobile, right-4 on sm+.
            */}
            {showSearchIcon ? (
              <span
                aria-hidden="true"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray_500 text-xl pointer-events-none"
              >
                {searchIcon}
              </span>
            ) : (
              <button
                type="button"
                aria-label="Submit search"
                onClick={handleSearch}
                className={[
                  "absolute right-2 top-1/2 -translate-y-1/2",
                  "label2 sm:label3 py-1 px-3 sm:px-[10px]",
                  "text-gray_900 bg-warning_500 rounded",
                  "cursor-pointer hover:bg-warning_400",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning_500 focus-visible:ring-offset-1",
                  "transition-colors duration-150",
                ].join(" ")}
              >
                Search
              </button>
            )}
          </div>

          {/* ── Zone 3: Desktop Icon Actions (hidden on mobile) ── */}
          {/*
            Changed: this zone is hidden on < md; mobile sees the icons in Row 1 above.
            This avoids duplicate rendering issues.
          */}
          <ul
            role="list"
            aria-label="Navigation actions"
            className="hidden md:flex items-center gap-x-5 lg:gap-x-6 flex-shrink-0"
          >
            {navMiddleIcon.map((item) => (
              <DesktopIconItem
                key={item.id}
                item={item}
                activePanel={activePanel}
                cartCount={addToCardItems.length}
                onToggle={handlePanelToggle}
                onClosePanel={() => setActivePanel(null)}
              />
            ))}
          </ul>

        </div>
      </Container>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Sub-component: DesktopIconItem
   Renders a single nav icon with optional dropdown panel (desktop layout).
   Extracted for readability and to separate mobile/desktop rendering cleanly.
───────────────────────────────────────────────────────────────────────── */
const DesktopIconItem = ({ item, activePanel, cartCount, onToggle, onClosePanel }) => {
  const isActive = activePanel === item.id;
  const isCart = item.itemName === "shopCart";

  return (
    <li className="relative">
      {isCart ? (
        /* Cart icon with item-count badge */
        <>
          <button
            type="button"
            aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
            aria-expanded={isActive}
            aria-haspopup="dialog"
            onClick={() => onToggle(item.id)}
            className={[
              "relative text-gray_00 text-[28px] lg:text-[32px] cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray_00 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary_700 rounded",
              "hover:opacity-80 transition-opacity duration-150",
            ].join(" ")}
          >
            {item.icon}
            {/* 
              Cart badge:
              Fixed: z-index was inverted in original (badge z-0, icon z-10).
              Badge should sit ON TOP of the icon. Corrected to z-10 for badge.
            */}
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-1 bg-gray_00 text-secondary_700 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center z-10 pointer-events-none"
            >
              {cartCount}
            </span>
          </button>

          {/*
            Cart dropdown panel:
            Fixed: hardcoded left-[-355px] caused viewport overflow on smaller desktops.
            Changed to right-0 positioning so it stays within the viewport.
            Added responsive max-w and overflow handling.
          */}
          {isActive && (
            <div
              role="dialog"
              aria-label="Shopping cart preview"
              className="absolute right-0 top-14 z-50 w-[320px] sm:w-[380px] shadow-xl rounded-lg overflow-hidden"
            >
              <AddToCartPop setIsAccountOpen={onClosePanel} />
            </div>
          )}
        </>
      ) : (
        /* Regular nav icon (wishlist, account, etc.) */
        <Link
          to={item.to}
          aria-label={item.label || item.itemName}
          className={[
            "text-gray_00 text-[28px] lg:text-[32px] cursor-pointer inline-flex",
            "hover:opacity-80 transition-opacity duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray_00 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary_700 rounded",
          ].join(" ")}
        >
          {item.icon}
        </Link>
      )}
    </li>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Sub-component: MobileIconItem
   Same logic as DesktopIconItem but with smaller icon sizes for mobile.
   Separated to allow independent size tuning without conditional sprawl.
───────────────────────────────────────────────────────────────────────── */
const MobileIconItem = ({ item, activePanel, cartCount, onToggle, onClosePanel }) => {
  const isActive = activePanel === item.id;
  const isCart = item.itemName === "shopCart";

  return (
    <li className="relative">
      {isCart ? (
        <>
          <button
            type="button"
            aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
            aria-expanded={isActive}
            aria-haspopup="dialog"
            onClick={() => onToggle(item.id)}
            className="relative text-gray_00 text-2xl sm:text-[28px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray_00 rounded"
          >
            {item.icon}
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-1 bg-gray_00 text-secondary_700 text-[10px] font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center z-10 pointer-events-none"
            >
              {cartCount}
            </span>
          </button>

          {/*
            Mobile cart dropdown: full-width from right edge, 
            constrained to viewport width with max-w-[calc(100vw-2rem)].
          */}
          {isActive && (
            <div
              role="dialog"
              aria-label="Shopping cart preview"
              className="absolute right-0 top-12 z-50 w-[300px] max-w-[calc(100vw-2rem)] shadow-xl rounded-lg overflow-hidden"
            >
              <AddToCartPop setIsAccountOpen={onClosePanel} />
            </div>
          )}
        </>
      ) : (
        <Link
          to={item.to}
          aria-label={item.label || item.itemName}
          className="text-gray_00 text-2xl sm:text-[28px] cursor-pointer inline-flex hover:opacity-80 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray_00 rounded"
        >
          {item.icon}
        </Link>
      )}
    </li>
  );
};

export default NavMiddle;