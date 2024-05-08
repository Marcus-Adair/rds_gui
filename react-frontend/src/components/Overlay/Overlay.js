// OverlayComponent.js

// import React from "react";
import React, { useEffect, useRef } from "react";

const Overlay = ({ onClose, dataToShow }) => {
  const overlayRef = useRef(null);

  // Effect for detecting when outside of the overlay is clicked
  useEffect(() => {
    const handleClickOutside = (event) => {
      const viewMoreButton = event.target.closest(".btn.btn-dot");

      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target) &&
        !viewMoreButton
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="overlay">
      <div
        className="overlay-content"
        ref={overlayRef}
        style={{ overflow: "hidden" }}
      >
        <button
          style={{ marginRight: "10px" }}
          className="close-button"
          onClick={onClose}
          title="Close"
        >
          X
        </button>
        {/* Content to display in the overlay */}

        <div
          className="overlay-text-content"
          style={{ whiteSpace: "pre-line" }}
        >
          {dataToShow}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
