import React from "react";

const PageSkeleton = () => {
  return (
    <div className="loader-wrap">
      <div className="spinner-scene">
        <div className="ring" />
        <div className="dot-orbit a" />
        <div className="dot-orbit b" />
        <div className="dot-orbit c" />
        <div className="core" />
      </div>
      <div className="label-row">
        <div className="bar-row">
          {[0, 0.15, 0.3, 0.45, 0.6].map((d, i) => (
            <div key={i} className="bar" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
        <span className="label-text">Loading</span>
      </div>
    </div>
  );
};

export default PageSkeleton;
