import { useState, useEffect, useRef } from "react";
import React from "react";
import "../../assets/css/paper-dashboard.css";
import Sublist from "components/Sublist/Sublist";
import Overlay from "components/Overlay/Overlay";
import OverlayContent from "components/OverlayContent/OverlayContent";

function List(props) {
  // extract properties
  const {
    items,
    heading,
    onSelectItem,
    // itemMap,
    setItems,
    restoreObjNamesOrder,
    setSelectedItemName,
    searchPress,
    clearSelectedItem,
    searchBarInput,
    clearPress,
    handleOpenOverlay,
  } = props;

  // Hardcode a map for items
  // const obj_map = itemMap;

  // paging stuff
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage] = useState(5); // Number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);

  const [currentItemsLength, setCurrentItemsLength] = useState(null);

  // For displaying the items per page
  const [itemCount, setItemCount] = useState(items.length);

  const [startItemNum, setStartItemNum] = useState(1);
  const [endItemNum, setEndItemNum] = useState(itemsPerPage);

  // for highlighting the selectd list item
  const [highlightedPage, setHighlightedPage] = useState(null);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [lastSelectedItemIndex, setLastSelectedItemIndex] = useState(null);

  const [showSublist, setShowSublist] = useState(false); // New state for showing sublist

  // For changing the list item's appearance when hovering
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);

  const setHoveredItemIdx = (index) => {
    // only set hover index if list item is not selected
    if (index !== selectedItemIndex) {
      setHoveredItemIndex(index);
    }
  };

  // State to track sorting order (ascending by default)
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to sort items alphabetically
  const sortItemsAlpha = () => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.localeCompare(b);
      } else {
        // sort desc
        return b.localeCompare(a);
      }
    });

    // Update items and reset to first page
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    setCurrentItems(sortedItems.slice(0, itemsPerPage));
    setCurrentItemsLength(sortedItems.length);
    setItems(sortedItems);
  };

  const unsortItems = () => {
    restoreObjNamesOrder();
  };

  const onSelectItemLocal = (item) => {
    onSelectItem(item);
  };

  const setSelectedItemIdx = (index) => {
    setSelectedItemIndex(index);
  };

  // Inside your functional component
  const listContainerRef = useRef(null);

  const setShowSublistOpp = () => {
    if (showSublist) {
      setShowSublist(false);
    } else {
      setShowSublist(true);
    }
  };

  useEffect(() => {
    const newCurrentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    setCurrentItems(newCurrentItems);
    setCurrentItemsLength(newCurrentItems.length);

    // calculate starting item count for display
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    setStartItemNum(startItem);

    // end item count
    const endItem = startItem + newCurrentItems.length - 1;
    setEndItemNum(endItem);

    // If itemCount changes
    if (items.length != itemCount) {
      // Update itemCount when items prop changes
      setItemCount(items.length);

      // update page number buttons
      renderPageNumbers();

      handlePageButtonClick(1);

      setSelectedItemIndex(null);
    }
  }, [items, currentPage]);

  useEffect(() => {
    if (searchBarInput != "") {
      setSelectedItemIndex(null);
    }
  }, [searchPress]);

  useEffect(() => {
    setSelectedItemIndex(null);
  }, [clearPress]);

  const buttonStyle1 = {
    margin: "0 5px",
    marginTop: "5px",
    background: "rgba(0, 0, 0, 0.05)",
    color: "black",
    height: "40px",
    width: "20px",
    textAlign: "center",
  };

  const buttonStyle2 = {
    margin: "0 5px",
    marginTop: "5px",
    background: "rgba(0, 0, 0, 0.2)",
    color: "black",
    height: "40px",
    width: "20px",
    textAlign: "center",
  };

  // Get number of pages to display
  const renderPageNumbers = () => {
    // Return nothing on no items
    if (items.length === 0) {
      return <></>;
    }

    const pageNumbers = [];

    const ceil = Math.ceil(items.length / itemsPerPage);

    const curPage = currentPage;

    var numsToDisplay = [1, 2];

    // Add numbers 2 less and 2 greater than curPage
    for (var i = curPage - 2; i <= curPage + 2; i++) {
      if (i > 2 && i < ceil - 1) {
        // Exclude 1 and ceil - 1 as they are already included
        numsToDisplay.push(i);
      }
    }

    numsToDisplay.push(ceil - 1, ceil);

    // Remove duplicates and 0 if it appears
    numsToDisplay = [...new Set(numsToDisplay)].filter((num) => num !== 0);

    if (items.length <= itemsPerPage) {
      var numsToDisplay = [1];
    }

    // Loop over page button count and render the button
    for (var i = 0; i < numsToDisplay.length; i++) {
      const num = numsToDisplay[i];

      const prevNum = numsToDisplay[i - 1];

      if (i == 0) {
        pageNumbers.push(
          <button
            key={`arrow-${i}`}
            onClick={() => handleArrowButtonClick(currentPage - 1)}
            className="btn btn-dot"
            style={
              currentPage === 1
                ? { ...buttonStyle1, pointerEvents: "none" }
                : buttonStyle1
            }
            title="Left Page"
          >
            &larr;
          </button>
        );
      }

      if (prevNum !== undefined && num !== prevNum + 1) {
        // Insert ellipsis button if the current number is not consecutive with the previous number

        if (prevNum === 2) {
          pageNumbers.push(
            <button
              key={`ellipsis-${i}`}
              onClick={() => handlePageButtonClick(num)}
              // onMouseLeave={() => unhighlightButton()}
              className="btn btn-dot"
              style={buttonStyle1}
              title="Traverse left"
            >
              ...
            </button>
          );
        } else {
          pageNumbers.push(
            <button
              key={`ellipsis-${i}`}
              onClick={() => handlePageButtonClick(currentPage + 1)}
              // onMouseLeave={() => unhighlightButton()}
              className="btn btn-dot"
              style={buttonStyle1}
              title="Traverse right"
            >
              ...
            </button>
          );
        }
      }

      const page_title = "Page " + num;

      pageNumbers.push(
        <button
          key={num}
          onClick={() => handlePageButtonClick(num)}
          className={
            currentPage === num ? "active btn btn-primary" : "btn btn-light"
          }
          style={buttonStyle2}
          title={page_title}
        >
          {num}
        </button>
      );

      if (i == numsToDisplay.length - 1) {
        var ind = i;
        if (ind == 0) {
          ind += 1;
        }
        pageNumbers.push(
          <button
            key={`arrow-${ind}`}
            onClick={() => handleArrowButtonClick(currentPage + 1)}
            className="btn btn-dot"
            style={
              currentPage === ceil
                ? { ...buttonStyle1, pointerEvents: "none" }
                : buttonStyle1
            }
            title="Right Page"
          >
            &rarr;
          </button>
        );
      }
    }
    return pageNumbers;
  };

  const handleArrowButtonClick = (pageNumber) => {
    const ceil = Math.ceil(items.length / itemsPerPage);

    if (pageNumber > 0 && pageNumber <= ceil) {
      handlePageButtonClick(pageNumber);
    }
  };

  // Handle when a page button is clicked (for navigating to a new page)
  const handlePageButtonClick = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Go back to highlighted item when on the page
    if (pageNumber == highlightedPage) {
      setSelectedItemIndex(lastSelectedItemIndex);
    } else {
      if (selectedItemIndex != null) {
        setLastSelectedItemIndex(selectedItemIndex);
      }
      setSelectedItemIndex(null);
    }
  };

  const getMessage = () => {
    return items.length === 0 && "No data items found";
  };

  // clear hovered list item
  const clearHoveredItem = () => {
    setHoveredItemIndex(null);
  };

  return (
    <div ref={listContainerRef} onMouseLeave={clearHoveredItem}>
      {/* Div for displaying the item count  */}
      <div
        className="data-items-indexing"
        style={{ marginBottom: "10px", marginLeft: "20px" }}
      >
        {itemCount !== 0
          ? `${startItemNum} - ${endItemNum} of ${itemCount} data items`
          : `${itemCount} data items`}

        {itemCount !== 0 ? (
          <button
            onClick={sortItemsAlpha}
            className="btn btn-light"
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              background: "rgb(52, 181, 184)",
              height: "35px",
            }}
            title="Sort by ascending/descending order"
          >
            <img
              src={require("../../assets/img/updownarrow.png")}
              style={{ width: "20px", height: "20px" }}
              alt="Sort Icon"
            />
          </button>
        ) : (
          <></>
        )}

        {itemCount !== 0 ? (
          <button
            onClick={unsortItems}
            className="btn btn-light"
            style={{
              marginLeft: "10px",
              borderRadius: "5px",
              background: "rgb(52, 181, 184)",
              height: "35px",
            }}
            title="Restore to original order"
          >
            {" "}
            Unsort
          </button>
        ) : (
          <></>
        )}
      </div>

      {/* List  */}
      <div
        style={{
          overflow: "auto",
          backgroundColor: "rgb(254, 253, 249)",
        }}
      >
        {/* Page Number buttons  */}
        <ul className="pagination">{renderPageNumbers()}</ul>

        {/* No Items display (if no items)  */}
        <p style={{ textAlign: "center" }}>{getMessage()}</p>

        {/* Actual List */}
        <ul className="list-group">
          {currentItems.map((item, index) => (
            <li
              //className="list-group-item"
              className={`list-group-item ${
                index === selectedItemIndex ? "selected" : ""
              } ${index === hoveredItemIndex ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredItemIdx(index)} // Set index on hover
              onMouseLeave={() => setHoveredItemIdx(null)} // Clear index on mouse leave
              key={item}
              onClick={() => {
                onSelectItemLocal(item);

                setSelectedItemName(item);

                setSelectedItemIdx(index);

                setHighlightedPage(currentPage);
                setShowSublistOpp();
                setHoveredItemIndex(null);
              }}
            >
              <p style={{ fontWeight: "bold" }}>{item}</p>

              <button
                className="btn btn-dot"
                style={{
                  color: "white",
                  background: "rgb(52, 181, 184)",
                  fontSize: "10px",
                }}
                onClick={() => {
                  handleOpenOverlay(item);
                }}
                title={"View more for " + item}
              >
                View More
              </button>
            </li>
          ))}
        </ul>
        {/* {showOverlay && (
          <Overlay onClose={handleCloseOverlay} dataToShow={dataToShow} />
        )} */}
      </div>
    </div>
  );
}

export default List;
