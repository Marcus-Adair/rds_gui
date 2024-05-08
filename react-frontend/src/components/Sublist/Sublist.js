import React, { useState } from "react";

const Sublist = ({ items }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);

  const setHoveredItemIdx = (index) => {
    if (index !== selectedItemIndex) {
      setHoveredItemIndex(index);
    } else {
      console.log("hovering over ");
    }
  };

  const handleItemClick = (index) => {
    console.log("in the handleClick function!");
    if (index !== selectedItemIndex) {
      setSelectedItemIndex(index);
      console.log("setting selectedItemIndex to: " + index);
    } else {
      selectedItemIndex(null);
      console.log("setting selectedItemIndex to null!");
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <li
          className={`list-group-item  ${
            index === hoveredItemIndex ? "hovered" : ""
          }`}
          key={index}
          onMouseEnter={() => setHoveredItemIdx(index)} // Set index on hover
          onMouseLeave={() => setHoveredItemIdx(null)} // Clear index on mouse leave
          onClick={() => handleItemClick(index)}
          style={{
            cursor: "pointer",
            backgroundColor: index === selectedItemIndex ? "yellow" : "white",
            color: "black",
          }}
        >
          {item}
        </li>
      ))}
    </div>
  );
};

export default Sublist;
