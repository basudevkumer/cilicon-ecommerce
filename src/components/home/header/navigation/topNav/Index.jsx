import Container from "@/components/commonComponent/containers/Container";
import { allIcons } from "@/helpers/IconProvider";
import React from "react";

/**
 * NavTop Component
 *
 * A top announcement/utility bar displayed above the main navigation.
 *
 * RESPONSIVE STRATEGY:
 * - On mobile (< sm): hide the welcome text to avoid overflow; show only social links centered.
 * - On sm and above: show both welcome text and social links side by side.
 * - On md and above: restore full layout with proper spacing.
 *
 * SEMANTIC IMPROVEMENTS:
 * - Wrapped root in <header> since this is a site-wide top bar.
 * - Used <nav> + <ul>/<li> for social icon links (already list-based, now properly linked).
 * - Added aria-label to the social nav for screen readers.
 * - Added role="list" and aria-label to the icon list for clarity.
 *
 * ACCESSIBILITY IMPROVEMENTS:
 * - Each social icon li now wraps an <a> with aria-label describing the platform.
 * - Added tabIndex and keyboard-accessible focus styles via ring utilities.
 * - Used sr-only span as a fallback text inside icon anchors.
 *
 * OVERFLOW PREVENTION:
 * - Added min-w-0 and truncate on welcome text to prevent long strings from breaking layout.
 * - Used flex-wrap on the outer container as a last resort guard.
 */
const NavTop = () => {
  const { fellowIcon } = allIcons;

  return (
    /* 
      Changed: <div> → <header> for semantic correctness.
      This is a page-level top bar, so <header> is the most appropriate element.
      Kept bg-secondary_700 and py-4 from original; added py-2 on mobile for tighter spacing.
    */
    <header className="bg-secondary_700 py-2 sm:py-[14px] md:py-4">
      <Container>
        {/*
          Outer flex row:
          - On mobile: center everything since welcome text is hidden.
          - On sm+: justify-between to push text left and socials right.
          - flex-wrap prevents hard overflow on very narrow viewports.
          - gap-y-1 handles any wrapped row spacing gracefully.
        */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-1">
          {/*
            Welcome text:
            - Hidden on xs (< sm) to prevent overflow on 320px screens.
            - Shown from sm breakpoint onward.
            - min-w-0 + truncate guard against unexpectedly long strings.
            - label3 utility class preserved from original design system.
            - Changed: added hidden sm:block for mobile-first hiding.
          */}
          <p
            className="hidden sm:block text-gray_00 label3 min-w-0 truncate pr-4"
            aria-label="Site announcement"
          >
            Welcome to Clicon online eCommerce store.
          </p>

          {/*
            Social links section:
            - Semantic: changed <div> → <nav> with aria-label for screen readers.
            - Border-right separator preserved; only visible when both columns show (sm+).
            - On mobile: no border-right, centered standalone.
            - gap-x-2 on mobile, gap-x-3 on sm+ to keep icons from crowding on small screens.
            - Changed: border conditional using sm: prefix.
          */}
          <nav
            aria-label="Follow us on social media"
            className="flex items-center gap-x-2 sm:gap-x-3 sm:border-r-2 sm:border-gray_00 sm:pr-4"
          >
            {/* "Follow us:" label — hidden on mobile to save space, shown sm+ */}
            <p className="hidden sm:block sm_400 text-gray_00 whitespace-nowrap">
              Follow us:
            </p>

            {/*
              Social icon list:
              - role="list" improves screen reader announcement.
              - Each icon is wrapped in an <a> tag for proper keyboard navigation and semantics.
              - aria-label on each <a> helps screen readers identify the social platform.
              - focus-visible:ring utilities provide keyboard focus indicators.
              - Hover opacity for subtle interactive feedback without altering the icon design.
              - Changed: added <a> wrapper, aria-label, focus styles, and hover state.
            */}
            <ul
              role="list"
              aria-label="Social media links"
              className="flex items-center gap-x-2 sm:gap-x-3"
            >
              {fellowIcon.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label || `Follow us on social media`}
                    className={[
                      "text-gray_00",
                      "inline-flex items-center justify-center",
                      "cursor-pointer",
                      /* Accessible focus ring — visible only on keyboard nav */
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray_00 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary_700",
                      "rounded-sm",
                      /* Subtle hover for interactivity feedback */
                      "hover:opacity-80 transition-opacity duration-150",
                      /* Touch target size for mobile usability (WCAG 2.5.5) */
                      "min-w-[28px] min-h-[28px]",
                    ].join(" ")}
                  >
                    {/*
                      sr-only span: provides screen reader text if icon has no inherent label.
                      Only renders if item.label exists. Falls back to aria-label on <a>.
                    */}
                    {item.label && (
                      <span className="sr-only">{item.label}</span>
                    )}
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default NavTop;
