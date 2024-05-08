import React from "react";

const OverlayContentWrapper = ({ overlayContentList }) => {
  return (
    <div style={{ height: "300px", overflowY: "auto" }}>
      {overlayContentList.map((content, index) => (
        <div key={index}>{content}</div>
      ))}
    </div>
  );
};

export default OverlayContentWrapper;
