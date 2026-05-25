import React from "react";
import { useNavigate } from "react-router-dom";
const PageNotFounds = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center gap-0">
      {/* Illustration */}
      <div
        className="relative w-56 h-44 mb-10 animate-bounce"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        {/* Floating particles */}
        <span
          className="absolute w-2 h-2 rounded-full bg-gray-300 top-2 left-5"
          style={{ animation: "drift 5s ease-in-out infinite" }}
        />
        <span
          className="absolute w-1.5 h-1.5 rounded-full bg-gray-300 top-5 right-4"
          style={{ animation: "drift 6.5s ease-in-out infinite 1s" }}
        />
        <span
          className="absolute w-1.5 h-1.5 rounded-full bg-gray-300 bottom-5 left-3"
          style={{ animation: "drift 7s ease-in-out infinite 0.5s" }}
        />

        {/* Monitor screen */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-32 rounded-xl border-2 border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
          <span className="text-5xl font-medium text-gray-200 tracking-tighter select-none">
            404
          </span>
          <span className="inline-block w-0.5 h-9 bg-gray-300 ml-0.5 align-middle animate-pulse" />
        </div>

        {/* Stand */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-1.5 h-4 bg-gray-300 rounded-b" />
          <div className="w-12 h-1 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-xs font-medium text-gray-400 tracking-wide mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        Page not found
      </span>

      {/* Heading */}
      <h1 className="text-2xl font-medium text-gray-900 mb-2.5 leading-snug">
        Oops! Looks like you're lost
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>

      {/* Main buttons */}
      <div className="flex gap-2.5 flex-wrap justify-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:opacity-80 transition-opacity"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go home
        </button>
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67l1.38-7.33H6" />
          </svg>
          Browse shop
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full max-w-xs mb-5">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-300">or jump to</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Quick links */}
      <div className="flex gap-2 flex-wrap justify-center max-w-sm">
        {[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: "About", path: "/about" },
          { label: "Support", path: "/customer-support" },
          { label: "Login", path: "/login" },
        ].map(({ label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="px-4 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-400 hover:border-gray-300 hover:text-gray-700 transition-all"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageNotFounds;
