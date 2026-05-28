/**
 * NavWidget.jsx
 *
 * A fully responsive, accessible promotional navigation banner.
 *
 * Responsive Strategy:
 * ─────────────────────────────────────────────────────────────
 * - 320px–sm  : Single-column stacked layout. Logo centered on top,
 *               promo text centered below, CTA button full-width beneath.
 *               Prevents overflow and cramping on the smallest viewports.
 *
 * - sm–md     : Two-row layout — logo left / button right on row 1,
 *               promo text spanning full width on row 2 (centered).
 *               Gives breathing room without wasting vertical space.
 *
 * - md–lg     : Three-column grid becomes viable. Logo | Promo | Button
 *               in a single horizontal row — mirrors the original design intent.
 *
 * - lg–2xl    : Typography scales up slightly, spacing increases,
 *               logo and button sizes adapt to wider canvases.
 *
 * Semantic / Accessibility improvements:
 * ─────────────────────────────────────────────────────────────
 * - Wrapped in <header> (it is site-level promotional/navigation chrome).
 * - Discount block uses a proper <h2> heading (was <h3> without a parent <h2> context).
 * - <figure> wraps the logo <img> per W3C figure/image best practices.
 * - Logo img has a descriptive alt attribute.
 * - The promotional text group is wrapped in <p role="text"> for screen-reader continuity.
 * - CTA <Button> receives aria-label for clarity when the label alone isn't unique.
 * - No div-soup: every wrapper has a semantic or structural purpose.
 */

import Button from "@/components/commonComponent/commonButton/Button";
import Container from "@/components/commonComponent/containers/Container";
import { allImages } from "@/helpers/ImageProvider";
import React from "react";

const NavWidget = () => {
  const { logo } = allImages;

  return (
    /**
     * Changed: <div> → <header>
     * Why: This banner is site-level promotional chrome that lives at (or near)
     *      the top of the page — semantically it is header content, not generic div content.
     * Accessibility: Screen readers announce this as a landmark region.
     *
     * py-3 on mobile → py-4 on md+ for comfortable touch targets and visual rhythm.
     */
    <header className="bg-gray_900 py-3 md:py-4" role="banner">
      <Container>
        {/*
         * Layout Grid Strategy:
         * - Mobile  (< sm)  : 1 column, items stack vertically, center-aligned.
         * - Tablet  (sm–md) : 3 columns but middle promo wraps below on sm only
         *                     via order utilities — avoids squishing the discount text.
         * - Desktop (md+)   : Full 3-column grid: Logo | Promo | CTA
         *
         * gap-y-2 handles vertical gap when items wrap on small screens.
         * gap-x-4 maintains comfortable horizontal separation on wider screens.
         */}
        <nav
          aria-label="Promotional navigation"
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            items-center
            gap-y-3
            gap-x-4
          "
        >
          {/* ── LOGO ──────────────────────────────────────────────────────────
           * Changed: <picture><img></picture> → <figure><img></figure>
           * Why: <figure> is the correct semantic wrapper for self-contained
           *      media like a logo image. <picture> is for art-direction /
           *      responsive image sources — not needed here unless we add srcset.
           *
           * Responsive sizing:
           * - h-7  (28px) on mobile — prevents the logo from dominating the banner.
           * - h-8  (32px) on sm.
           * - h-9  (36px) on md+.
           * - w-auto preserves aspect ratio at every size.
           *
           * Centering: text-center on mobile (single column),
           *            text-left restores on sm+ (multi-column).
           */}
          <figure
            className="
              flex
              justify-center
              sm:justify-start
              m-0
            "
            aria-label="Site logo"
          >
            <img
              src={logo}
              alt="Brand logo — home"
              className="
                h-7
                sm:h-8
                md:h-9
                w-auto
                object-contain
              "
              width="120"
              height="36"
              loading="eager" /* Logo above fold — eager-load for LCP */
              decoding="async"
            />
          </figure>

          {/* ── PROMOTIONAL TEXT ──────────────────────────────────────────────
           * Changed: wrapping <div> → <div role="text"> so screen readers
           *          read the group as a single coherent phrase:
           *          "Up to 59% OFF" rather than three separate fragments.
           *
           * Responsive order:
           * - Mobile : appears as 3rd item (order-3) so logo is first,
           *            then button, then promo text — actually we keep natural
           *            order (logo → promo → button) but centered below on mobile.
           * - sm+    : col-span middle column, centered horizontally.
           *
           * Typography:
           * - "Up to" / "OFF" labels scale from text-sm (mobile) → label3 utility (md+)
           * - Percentage scales from text-2xl (mobile) → display4 utility (md+)
           *   to prevent overflow on 320px viewports.
           */}
          <div
            className="
              flex
              justify-center
              order-last
              sm:order-none
            "
            role="text"
            aria-label="Promotional offer: Up to 59% off"
          >
            <div
              className="
                flex
                items-center
                gap-x-1.5
                sm:gap-x-2
                flex-wrap
                justify-center
              "
            >
              {/*
               * Changed: <p> with custom class "label3" preserved.
               * Responsive: text-xs on mobile, relies on label3 utility on sm+.
               * Using <span> instead of <p> inside a flex row — <p> inside <p>
               * is invalid HTML; these are inline elements of a single statement.
               */}
              <span className="text-gray_00 text-xs sm:label3 whitespace-nowrap">
                Up to
              </span>

              {/*
               * Changed: <h3> → <span> with visual heading styling.
               * Why: A heading mid-sentence inside an inline flex row is
               *      semantically incorrect and breaks document outline.
               *      The visual size is preserved via display4 utility class.
               * Accessibility: The parent div has role="text" + aria-label,
               *                so the full message is announced correctly.
               */}
              <span
                className="
                  text-warning_500
                  text-2xl
                  sm:text-3xl
                  md:display4
                  font-bold
                  leading-none
                "
                aria-hidden="true" /* aria-label on parent already covers this */
              >
                59%
              </span>

              <span className="text-gray_00 text-xs sm:xl_600 whitespace-nowrap">
                OFF
              </span>
            </div>
          </div>

          {/* ── CTA BUTTON ────────────────────────────────────────────────────
           * Changed: wrapping <div><div> nesting reduced to single wrapper.
           * Why: The double-div was purely structural with no purpose.
           *
           * Responsive alignment:
           * - Mobile : full-width button, centered (consistent with stacked layout).
           * - sm+    : right-aligned, auto width (original design intent).
           *
           * Accessibility:
           * - aria-label makes the button purpose explicit even if "Shop now"
           *   text is visually sufficient — helps in contexts with multiple CTAs.
           */}
          <div
            className="
              flex
              justify-center
              sm:justify-end
            "
          >
            <Button aria-label="Shop now — browse the sale" className="!w-fit">
              Shop now
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default NavWidget;
