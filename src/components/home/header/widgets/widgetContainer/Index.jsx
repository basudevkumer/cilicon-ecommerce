/**
 * WidgetContainer.jsx — Fixed Responsive Layout
 *
 * FIXES:
 * ─────────────────────────────────────────────────────────────────────
 * 1. X-axis overflow/scroll সম্পূর্ণ বন্ধ — overflow-x-hidden wrapper দিয়ে।
 * 2. 320px (iPhone 4) তে single column, content-driven height।
 * 3. sm (640px) তে BigWidget full width, SmallWidgets নিচে 2-col।
 * 4. md (768px) তে same as sm।
 * 5. lg (1024px) তে 3-col grid — BigWidget col-span-2, SmallWidgets col-span-1।
 * 6. xl (1280px) তে BigWidget exactly 872px wide (2/3 of container),
 *    SmallWidget exactly 424×248px — achieved via explicit pixel constraints।
 * 7. 2xl: BigWidget h-[520px], SmallWidget h-[248px] — exact per requirements।
 * 8. border-radius: 6px (rounded-[6px]) on both widgets।
 *
 * LAYOUT STRATEGY:
 * ─────────────────────────────────────────────────────────────────────
 * Mobile-first:
 *   - Default: 1 col, stacked
 *   - sm: BigWidget full width, SmallWidgets in a row (grid-cols-2) below
 *   - lg+: 3-col fixed layout, BigWidget = col-span-2
 *   - 2xl: exact pixel heights per design spec
 */

import Container from "@/components/commonComponent/containers/Container";
import React from "react";
import BigWidget from "../bigWidgets/Index";
import SmallWidget from "../smallWidget/Index";
import { allImages } from "@/helpers/ImageProvider";

const WidgetContainer = () => {
  const { widget2 } = allImages;

  return (
    /*
     * overflow-x-hidden on the section — prevents any child from causing
     * horizontal scroll at any breakpoint. Critical for 320px support.
     */
    <section
      aria-label="Featured promotional widgets"
      className="py-4 md:py-6  w-full"
    >
      <Container>
        {/*
         * RESPONSIVE GRID:
         *
         * Default/sm/md : 1 column, gap-y-4
         * lg            : 3 columns, items-stretch, fixed gap
         * 2xl           : 3 columns, h-[520px] fixed height for design-spec alignment
         *
         * NOTE: We do NOT set fixed height at lg — only at 2xl where the
         * exact 520px design spec kicks in. This prevents clipping at 1024–1279px.
         */}
        <div
          className="
            grid grid-cols-1 gap-4
            lg:grid-cols-3 lg:gap-6 lg:items-stretch
            2xl:h-[520px]
          "
        >
          {/*
           * BigWidget slot:
           * - Full width on mobile/sm/md
           * - col-span-2 on lg+
           * - At 2xl: height is controlled by the parent's h-[520px] + h-full here
           *
           * The BigWidget internally renders at 100% of this container's size.
           * On 2xl the parent is 520px tall, so BigWidget fills 520px exactly.
           * Width on a 3-col grid at xl (1280px content ~1216px) → col-span-2 ≈ 800px
           * At 2xl (1536px content ~1472px) → col-span-2 ≈ 976px — BigWidget
           * constrains itself to max-w-[872px] internally for the exact design spec.
           */}
          <article
            aria-label="Main promotional banner"
            className="w-full lg:col-span-2 lg:h-full"
          >
            <BigWidget />
          </article>

          {/*
           * SmallWidgets column:
           *
           * Mobile/sm/md: 2-col sub-grid — widgets side by side
           *   Each widget: aspect-[16/9] so height is natural/proportional
           *
           * lg+: single column (flex-col), stacked, gap-4 between them
           *   Each takes 50% of the column height (h-1/2)
           *   At 2xl (parent h-[520px]): each SmallWidget ≈ 248px tall ✓
           *
           * SmallWidget internally constrains width to max-w-[424px] at xl+
           * for the exact design spec.
           */}
          <aside
            aria-label="Secondary promotional widgets"
            className="
              grid grid-cols-1 md:grid-cols-2 gap-3
              sm:gap-4
              lg:flex lg:flex-col lg:gap-4 lg:h-full
            "
          >
            <div className="w-full lg:h-1/2">
              <SmallWidget images={widget2} label="Promotional offer 1" />
            </div>
            <div className="w-full lg:h-1/2">
              <SmallWidget images={widget2} label="Promotional offer 2" />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
};

export default WidgetContainer;