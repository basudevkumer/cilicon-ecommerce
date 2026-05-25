/**
 * BigWidget.jsx — Fixed Responsive + Exact 2xl Dimensions
 *
 * FIXES:
 * ─────────────────────────────────────────────────────────────────────
 * 1. Mobile (320px): aspect-[16/9] — proportional height, no overflow।
 *    Image fills the container via object-cover।
 * 2. sm/md: same aspect-ratio approach, full width।
 * 3. lg (1024px+): h-full — fills the parent article in the 3-col grid।
 *    No fixed pixel height here — avoids clipping at 1024–1279px range।
 * 4. 2xl (1536px+): parent container sets h-[520px], this component
 *    fills it. Width at 2xl on col-span-2 naturally hits ~980px, but we
 *    cap via max-w-[872px] mx-auto to match the exact design spec।
 * 5. border-radius: 6px (rounded-[6px]) — design spec requirement।
 * 6. overflow-hidden on wrapper ensures cards effect clips cleanly।
 * 7. Swiper h-full/w-full — fills the wrapper completely at all sizes।
 *
 * DIMENSION SPEC (2xl):
 * ─────────────────────────────────────────────────────────────────────
 * Width : 872px  → max-w-[872px] + w-full
 * Height: 520px  → controlled by WidgetContainer's 2xl:h-[520px] + h-full chain
 * Radius: 6px    → rounded-[6px]
 */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { Autoplay, EffectCards, Pagination } from "swiper/modules";
import { allImages } from "@/helpers/ImageProvider";

/**
 * BigWidget
 *
 * @param {Array} slides — Optional array of { src, alt } objects.
 *                         Falls back to 4× widget1 for backwards compatibility.
 */
const BigWidget = ({ slides }) => {
  const { widget1 } = allImages;

  const slideData =
    slides && slides.length > 0
      ? slides
      : [
          { id: 1, src: widget1, alt: "Featured promotion — slide 1" },
          { id: 2, src: widget1, alt: "Featured promotion — slide 2" },
          { id: 3, src: widget1, alt: "Featured promotion — slide 3" },
          { id: 4, src: widget1, alt: "Featured promotion — slide 4" },
        ];

  return (
    /*
     * SIZING BREAKDOWN:
     *
     * w-full              — always fills horizontal space
     * max-w-[872px]       — caps at design spec width on large screens
     * mx-auto             — centers within col-span-2 if narrower than col
     *
     * Height chain:
     *   Mobile/sm/md : aspect-[16/9] — natural proportional height
     *   lg+          : aspect-auto + h-full — fills parent's height
     *   2xl          : parent has h-[520px], this fills it → 520px ✓
     *
     * rounded-[6px]       — design spec border radius
     * overflow-hidden     — clips Swiper cards effect correctly
     */
    <div
      className="
        w-full max-w-[872px] 
        aspect-[16/9]
        lg:aspect-auto lg:h-full
        overflow-hidden rounded-[6px]
      "
      role="region"
      aria-label="Main promotional image carousel"
      aria-roledescription="carousel"
    >
      <Swiper
        effect="cards"
        grabCursor={true}
        pagination={{ dynamicBullets: true, clickable: true }}
        modules={[EffectCards, Pagination, Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        a11y={{
          prevSlideMessage: "Previous promotional slide",
          nextSlideMessage: "Next promotional slide",
        }}
        className="big-widget-swiper h-full w-full"
        style={{
          "--swiper-pagination-color": "var(--warning_500)",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-inactive-color": "#020202ff",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        }}
      >
        {slideData.map((slide, index) => (
          <SwiperSlide
            key={slide.id ?? index}
            aria-label={`Slide ${index + 1} of ${slideData.length}`}
          >
            {/*
             * w-full h-full — fills SwiperSlide fully
             * object-cover  — no distortion at any aspect ratio
             */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BigWidget;