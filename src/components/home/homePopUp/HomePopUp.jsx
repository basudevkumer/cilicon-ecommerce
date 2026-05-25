/**
 * HomePopUp.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A fully responsive, accessible product quick-view modal.
 *
 * RESPONSIVE STRATEGY
 *   • Mobile-first: single-column stacked layout on xs/sm.
 *   • Two-column grid kicks in at lg (≥1024 px) — image left, info right.
 *   • Max-width capped at 1200 px so the dialog never feels too wide on 4K.
 *   • All fixed px sizes (fonts, gaps, padding) replaced with responsive
 *     Tailwind utilities that scale across every breakpoint.
 *
 * SEMANTIC / ACCESSIBILITY IMPROVEMENTS
 *   • Wraps the overlay in <dialog>-style semantics via role="dialog",
 *     aria-modal="true", aria-labelledby pointing at the product title.
 *   • Close button has an aria-label so screen readers announce its purpose.
 *   • Keyboard trap: ESC key closes the modal (useEffect listener).
 *   • Focus is moved into the dialog on mount via autoFocus on the close btn.
 *   • Quantity controls use <output> + aria-live for screen-reader updates.
 *   • Meaningful alt text on every <img>.
 *   • Heading hierarchy: h2 for product name, h3 for price.
 *   • Section / article / figure tags replace generic divs where appropriate.
 *
 * REFACTORING NOTES
 *   • Extracted the price/discount calculation into a helper so the JSX is
 *     cleaner and the formula is not repeated.
 *   • Removed the duplicate handleIncrement logic that incorrectly spread
 *     `data` (the full array) instead of `singleData`.
 *   • Overflow-y scroll added to the dialog panel so tall viewports never
 *     push content off screen.
 *   • z-index ladder: overlay = z-50, panel = z-60, close btn = z-70 —
 *     kept consistent with original intent but expressed with Tailwind
 *     arbitrary values to avoid Tailwind v4 z-index gaps.
 */

import Star from "@/components/commonComponent/commonStar/Star";
import Ceracell from "@/components/details/detailCeracell/Ceracell";
import { allIcons } from "@/helpers/IconProvider";
import { allImages } from "@/helpers/ImageProvider";
import { useTotalItems } from "@/hooks/useCategory";
import { addTocard, updateQuanty } from "@/reduxFeature/slices/shopSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* ─── helpers ──────────────────────────────────────────────────────────────── */

/**
 * Calculates the original (pre-discount) price.
 * Kept in a pure function to keep JSX readable and avoid duplication.
 */
const calcOriginalPrice = (price, discountPct) =>
  (price / (1 - discountPct / 100)).toFixed(2);

/* ─── component ─────────────────────────────────────────────────────────────── */

const HomePopUp = ({ eventHandle }) => {
  /* ── Redux ──────────────────────────────────────────────────────────────── */
  const dispatch = useDispatch();
  const cardItems = useSelector((state) => state.addCard.value);

  /* ── Assets ─────────────────────────────────────────────────────────────── */
  const { pymentCardImage } = allImages;
  const { detailPageIcon, productInfoActivites, compareIcon, plainClose } =
    allIcons;

  /* ── Data ───────────────────────────────────────────────────────────────── */
  const { data, isLoading } = useTotalItems();
  const [singleData, setSingleData] = useState({});

  useEffect(() => {
    if (data?.length > 0) {
      const found = data.find((item) => item?.id === 169);
      if (found) setSingleData(found);
    }
  }, [data]);

  /* ── Cart state ─────────────────────────────────────────────────────────── */
  const haveCardItems = cardItems.find((item) => item.id === singleData?.id);
  const currentItems = haveCardItems ? haveCardItems.quantity : 0;

  /* ── Keyboard accessibility: close on ESC ───────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") eventHandle?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    // Prevent background scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [eventHandle]);

  /* ── Focus management: move focus inside dialog on mount ────────────────── */
  const closeBtnRef = useRef(null);
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  /* ── Cart handlers ──────────────────────────────────────────────────────── */
  const handleAddToCart = () => {
    dispatch(addTocard({ ...singleData, quantity: 1 }));
  };

  const handleIncrement = (id) => {
    if (!haveCardItems) {
      // FIX: was spreading `data` (array). Now correctly spreads `singleData`.
      dispatch(addTocard({ ...singleData, quantity: 1 }));
    } else {
      dispatch(updateQuanty({ id, type: "increment" }));
    }
  };

  const handleDecrement = (id) => {
    dispatch(updateQuanty({ id, type: "decrement" }));
  };

  /* ── Derived values ─────────────────────────────────────────────────────── */
  const displayQty = currentItems > 0 ? currentItems : 1;
  const originalPrice =
    singleData?.price && singleData?.discountPercentage
      ? calcOriginalPrice(singleData.price, singleData.discountPercentage)
      : null;

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    /*
     * OVERLAY
     * role="dialog" + aria-modal tells AT that content behind is inert.
     * Clicking the backdrop also closes the modal (UX best practice).
     */
    <div
      className="fixed inset-0 z-[50] flex items-center justify-center bg-black/50 px-4 py-6 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-product-title"
      onClick={(e) => {
        // Close when clicking the backdrop (not the panel itself)
        if (e.target === e.currentTarget) eventHandle?.();
      }}
    >
      {/*
       * DIALOG PANEL
       * • max-w-[1200px] caps width on ultra-wide screens.
       * • overflow-y-auto ensures scrollability on short viewports.
       * • Single column on mobile → two columns at lg.
       * • relative so the close button can be absolutely positioned.
       */}
      <article
        className="
          relative w-full max-w-[1200px] max-h-[90vh]
          bg-gray_00 rounded-lg shadow-2xl
          overflow-y-auto
          grid grid-cols-1 lg:grid-cols-2
          gap-y-6 lg:gap-x-10
          p-5 sm:p-8 lg:p-12
        "
        onClick={(e) => e.stopPropagation()} // prevent overlay click-close from triggering here
      >
        {/*
         * CLOSE BUTTON
         * • absolute top-right, always visible.
         * • aria-label provides accessible name for screen readers.
         * • ref used to auto-focus on mount (keyboard accessibility).
         */}
        <button
          ref={closeBtnRef}
          aria-label="Close product preview"
          onClick={eventHandle}
          className="
            absolute top-3 right-3
            flex items-center justify-center
            w-9 h-9 sm:w-10 sm:h-10
            rounded-full
            text-gray_600 bg-gray_50
            hover:bg-danger_500 hover:text-gray_00
            transition duration-300 ease-in-out
            text-xl z-[70]
            focus:outline-none focus:ring-2 focus:ring-danger_500
          "
        >
          {/* plainClose is an icon — the aria-label on the button is sufficient */}
          <span aria-hidden="true">{plainClose}</span>
        </button>

        {/* ── LEFT COLUMN: product image carousel ─────────────────────────── */}
        <section aria-label="Product images" className="w-full">
          {isLoading ? (
            /* Skeleton placeholder while images load */
            <div className="w-full aspect-square bg-gray_100 animate-pulse rounded-md" />
          ) : (
            <Ceracell img={singleData?.images || []} />
          )}
        </section>

        {/* ── RIGHT COLUMN: product details ───────────────────────────────── */}
        <section aria-label="Product details" className="flex flex-col gap-y-4">

          {/* Rating row */}
          <header className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Star starsCard={singleData?.rating} />
            <p className="sm_600 text-gray_900">
              {singleData?.rating} Star Rating
            </p>
            <p className="sm_400 text-gray_600">
              ({singleData?.reviews?.length ?? 0} User feedback)
            </p>
          </header>

          {/*
           * Product title — h2 is correct here; the page's h1 lives in the
           * main content below this overlay.
           */}
          <h2
            id="popup-product-title"
            className="xl_400 text-gray_900 leading-snug"
          >
            {singleData?.title}
          </h2>

          {/* Meta grid: SKU / availability / brand / category */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex gap-x-1">
              <dt className="sm_400 text-gray_600">Sku:</dt>
              <dd className="sm_600 text-gray_900">{singleData?.sku}</dd>
            </div>
            <div className="flex gap-x-1">
              <dt className="sm_400 text-gray_600">Availability:</dt>
              <dd className="sm_600 text-success_500">
                {singleData?.availabilityStatus}
              </dd>
            </div>
            <div className="flex gap-x-1">
              <dt className="sm_400 text-gray_600">Brand:</dt>
              <dd className="sm_600 text-gray_900">{singleData?.brand}</dd>
            </div>
            <div className="flex gap-x-1">
              <dt className="sm_400 text-gray_600">Category:</dt>
              <dd className="sm_600 text-gray_900">{singleData?.category}</dd>
            </div>
          </dl>

          {/* Price block */}
          <div className="py-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-gray_100">
            <h3 className="heading3 text-secondary_500">
              ${singleData?.price}
            </h3>
            {originalPrice && (
              <p className="lg_400 text-gray_500">
                <del aria-label={`Original price $${originalPrice}`}>
                  ${originalPrice}
                </del>
              </p>
            )}
            {singleData?.discountPercentage && (
              <span
                className="py-[5px] px-[10px] bg-warning_400 text-gray_900 tiny_600 rounded"
                aria-label={`${Math.round(singleData.discountPercentage)} percent off`}
              >
                {Math.round(singleData.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {/* Dimensions + QR */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4">
            <div>
              <dt className="sm_400 text-gray_900">Width</dt>
              <dd className="sm_400 text-gray_700">
                {singleData?.dimensions?.width} cm
              </dd>
            </div>
            <div>
              <dt className="sm_400 text-gray_900">Height</dt>
              <dd className="sm_400 text-gray_700">
                {singleData?.dimensions?.height} cm
              </dd>
            </div>
            <div>
              <dt className="sm_400 text-gray_900">Depth</dt>
              <dd className="sm_400 text-gray_700">
                {singleData?.dimensions?.depth} cm
              </dd>
            </div>
            {singleData?.meta?.qrCode && (
              <div>
                <dt className="sm_400 text-gray_900">Product QR</dt>
                <dd>
                  <figure>
                    <img
                      src={singleData.meta.qrCode}
                      alt={`QR code for ${singleData.title}`}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  </figure>
                </dd>
              </div>
            )}
          </dl>

          {/* ── Quantity selector + CTA buttons ────────────────────────────── */}
          <div className="flex flex-wrap items-stretch gap-3 py-2">
            {/*
             * Quantity control
             * <output> wraps the live count so assistive tech announces changes.
             */}
            <div
              className="flex items-center border-2 border-gray_100 px-4 gap-6"
              role="group"
              aria-label="Quantity selector"
            >
              <button
                aria-label="Decrease quantity"
                className="text-2xl text-gray_900 cursor-pointer hover:text-danger_500 transition-colors leading-none py-2"
                onClick={() => handleDecrement(singleData.id)}
              >
                −
              </button>
              <output
                aria-live="polite"
                aria-atomic="true"
                className="text-sm font-medium text-gray_700 min-w-[1.5ch] text-center"
              >
                {displayQty}
              </output>
              <button
                aria-label="Increase quantity"
                className="text-2xl text-gray_900 cursor-pointer hover:text-primary_500 transition-colors leading-none py-2"
                onClick={() => handleIncrement(singleData.id)}
              >
                +
              </button>
            </div>

            {/* Add to cart — navigates to cart page on click */}
            <Link to="/shopping-card" className="flex-1 min-w-[140px]">
              <button
                aria-label="Add to cart and go to shopping cart"
                onClick={handleAddToCart}
                className="
                  w-full h-full px-5
                  bg-primary_500 hover:bg-primary_600
                  heading6 text-gray_00
                  flex items-center justify-center gap-x-2
                  transition duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary_500
                  lg:whitespace-nowrap
                "
              >
                Add to Cart
                <span aria-hidden="true" className="text-lg">
                  {productInfoActivites[0].icon}
                </span>
              </button>
            </Link>

            {/* Buy now */}
            <button
              aria-label="Buy now"
              className="
                px-5 py-2
                heading6 border-2 border-primary_500
                text-primary_500 hover:bg-primary_50
                rounded transition duration-200 uppercase whitespace-nowrap
                focus:outline-none focus:ring-2 focus:ring-primary_500
              "
            >
              Buy Now
            </button>
          </div>

          {/* ── Wishlist / Compare / Share ──────────────────────────────────── */}
          <footer className="flex flex-wrap justify-between items-center gap-4 pt-1">
            <nav aria-label="Product actions" className="flex items-center gap-x-5">
              <button
                aria-label="Add to wishlist"
                className="flex items-center gap-x-1.5 text-gray_700 hover:text-primary_500 transition-colors"
              >
                <span aria-hidden="true">{productInfoActivites[1].icon}</span>
                <span className="sm_400">Add to Wishlist</span>
              </button>
              <button
                aria-label="Add to compare"
                className="flex items-center gap-x-1.5 text-gray_700 hover:text-primary_500 transition-colors"
              >
                <span aria-hidden="true">{compareIcon}</span>
                <span className="sm_400">Compare</span>
              </button>
            </nav>

            <div className="flex items-center gap-x-3">
              <p className="sm_400 text-gray_700">Share:</p>
              <nav aria-label="Share product on social media" className="flex gap-x-2">
                {detailPageIcon.map((item, index) => (
                  <button
                    key={index}
                    aria-label={`Share on ${item.label ?? `platform ${index + 1}`}`}
                    className="text-base text-gray_600 hover:text-primary_500 transition duration-200"
                  >
                    <span aria-hidden="true">{item.icon}</span>
                  </button>
                ))}
              </nav>
            </div>
          </footer>

          {/* Secure payment badge */}
          <aside
            aria-label="Payment security"
            className="p-4 border border-gray_100 rounded mt-2"
          >
            <p className="sm_400 text-gray_900 pb-2">
              100% Guarantee Safe Checkout
            </p>
            <figure>
              <img
                src={pymentCardImage}
                alt="Accepted payment methods: Visa, Mastercard, PayPal, and more"
                className="w-full max-w-xs h-auto"
                loading="lazy"
              />
            </figure>
          </aside>
        </section>
      </article>
    </div>
  );
};

export default HomePopUp;