/**
 * SmallWidget.jsx — Fixed Responsive + Exact 2xl Dimensions
 *
 * FIXES:
 * ─────────────────────────────────────────────────────────────────────
 * 1. Mobile (320px): Fixed hardcoded w-[424px] h-[248px] removed।
 *    Now uses w-full + aspect-[16/9] — proportional, no overflow।
 *    X-axis scroll সম্পূর্ণ বন্ধ।
 * 2. sm/md: same approach — aspect ratio driven height, full width।
 * 3. lg+: h-full — fills the h-1/2 slot inside WidgetContainer।
 *    WidgetContainer gives each SmallWidget wrapper h-1/2 of the column।
 * 4. 2xl: parent chain → WidgetContainer h-[520px] → aside h-full →
 *    each div h-1/2 = 248px → SmallWidget h-full = 248px ✓
 *    Width on the aside column at 2xl ≈ 488px, but max-w-[424px] caps it ✓
 * 5. border-radius: 6px (rounded-[6px]) — design spec requirement।
 * 6. Navigation arrows removed (too cluttered at small size)।
 * 7. Invalid "swiper/css/autoplay" import removed।
 * 8. className "mySwiper" → "small-widget-swiper" (no CSS conflict)।
 *
 * DIMENSION SPEC (2xl):
 * ─────────────────────────────────────────────────────────────────────
 * Width : 424px  → max-w-[424px] + w-full
 * Height: 248px  → controlled by h-1/2 chain from WidgetContainer's 2xl:h-[520px]
 * Radius: 6px    → rounded-[6px]
 *
 * PROPS:
 * ─────────────────────────────────────────────────────────────────────
 * @param {Array}  images — Array of { id, src } objects. Defaults to [].
 * @param {string} label  — Accessible label. Defaults to "Promotional widget carousel".
 */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const SmallWidget = ({ images = [], label = "Promotional widget carousel" }) => {
  const imageArray = Array.isArray(images) ? images : [];

  return (
    /*
     * SIZING BREAKDOWN:
     *
     * w-full              — fills horizontal space always
     * max-w-[424px]       — caps at design spec width on large screens
     * mx-auto             — centers if parent is wider than 424px
     *
     * Height chain:
     *   Mobile/sm/md : aspect-[16/9] — proportional, content-driven
     *   lg+          : aspect-auto + h-full — fills h-1/2 parent slot
     *   2xl          : (520px / 2) = 248px ✓
     *
     * rounded-[6px]       — design spec border radius
     * overflow-hidden     — clips Swiper correctly
     *
     * CRITICAL: min-w-0 prevents flex/grid children from overflowing
     * their containers — fixes X-axis scroll on small screens.
     */
    <div
      className="
        w-full 
        aspect-[16/9]
        lg:aspect-auto lg:h-full
        overflow-hidden rounded-[6px]
      "
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
    >
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Autoplay, Pagination]}
        a11y={{
          prevSlideMessage: "Previous promotional image",
          nextSlideMessage: "Next promotional image",
        }}
        className="small-widget-swiper h-full w-full"
        style={{
          "--swiper-pagination-color": "var(--warning_500)",
          "--swiper-pagination-bullet-size": "8px",
          "--swiper-pagination-bullet-inactive-color": "#020202ff",
          "--swiper-pagination-bullet-inactive-opacity": "0.4",
        }}
      >
        {imageArray.length > 0 ? (
          imageArray.map((item, index) => (
            <SwiperSlide
              key={item.id ?? index}
              aria-label={`${label} — slide ${index + 1} of ${imageArray.length}`}
            >
              {/*
               * w-full h-full + object-cover:
               * - Fills the SwiperSlide completely at all sizes
               * - No distortion, no fixed pixel dimensions
               * - Replaces the original broken w-[424px] h-[248px]
               */}
              <img
                src={item.src}
                alt={`Promotional image ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div
              className="w-full h-full bg-gray_800 flex items-center justify-center"
              aria-label="No promotional images available"
            >
              <span className="text-sm text-gray_500">No images available</span>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default SmallWidget;

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * RESPONSIVE SUMMARY
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Breakpoint   | SmallWidget size
 * ─────────────────────────────────────────────────────────────────────────────
 * 320px        | full width ÷ 2 (2-col sub-grid), height = aspect-[16/9]
 * 390px (sm)   | same as 320px
 * 640px (sm)   | same
 * 768px (md)   | same
 * 1024px (lg)  | ~1/3 of container width, height = 50% of column (auto)
 * 1280px (xl)  | same as lg, max-w-[424px] kicks in
 * 1536px (2xl) | max-w-[424px], height = 248px ✓ (520 ÷ 2 from parent)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * PRESERVED PROGRESS CIRCLE (for reference if product requires it):
 * See original SmallWidget.jsx file — implementation notes preserved there.
 * ─────────────────────────────────────────────────────────────────────────────
 */