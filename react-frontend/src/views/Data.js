/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import React from "react";
import React, { useState, useEffect } from "react";

// import ScrollableListContainer from "components/ScrollableListContainer/ScrollableListContainer";
import List from "components/List/List";

import DisplayWindow from "components/DisplayWindow/DisplayWindow";
import Overlay from "components/Overlay/Overlay";
import OverlayContent from "components/OverlayContent/OverlayContent";
import OverlayContentCart from "components/OverlayContent/OverlayContentCart";
import OverlayContentWrapper from "components/OverlayContent/OverlayContentWrapper";

function Data({
  searchBarInput,
  searchPress,
  setSearchPress,
  clearPress,
  setClearPress,
  cartPress,
  setCartPress,
  incCartCounter,
  decCartCounter,
  setCartCount,
}) {
  // var obj_names = [];

  const [obj_names, setobj_names] = useState([]);

  // var obj_names_og = [];
  const [obj_names_og, setObj_names_og] = useState([]);

  const [objNames, setObjNames] = useState([]);

  const [displayContent, setDisplayContent] = useState("");

  const [testState, setTestState] = useState([{}]);

  // var obj_map = new Map();
  const [obj_map, setObj_Map] = useState(new Map());

  const [obj_names_og_order, setObj_names_og_order] = useState([]);

  const [cartObjNames, setCartObjNames] = useState([]);

  ////////////////////////////////////////////////////////////////////////////////

  // OVERLAY LOGIC
  const [showOverlay, setShowOverlay] = useState(false);
  const [dataToShow, setDataToShow] = useState(null);

  const handleOpenOverlayCart = () => {
    var displayData = [];
    displayData.push(
      <OverlayContentCart
        cartObjNames={cartObjNames}
        clearShoppingCart={clearShoppingCart}
        removeFromShoppingCart={removeFromShoppingCart}
      />
    );
    setDataToShow(displayData);
    setShowOverlay(true);
  };

  const addToShoppingCart = (item) => {
    // Get item name and version to check it its already in the cart
    const itemName = item[0][0];
    const itemVersion = item[1][0];

    // Check if the object is in the cart already
    var itemExists = false;
    cartObjNames.forEach((item) => {
      const itemNameCheck = item[0][0];
      const itemVersionCheck = item[1][0];

      if (itemNameCheck === itemName && itemVersionCheck === itemVersion) {
        itemExists = true;
      }
    });

    // Add item to the card if its not already in it
    if (!itemExists) {
      console.log("Adding item to the cart!!!");
      setCartObjNames((prevState) => [...prevState, item]);
      incCartCounter();
    } else {
      console.log("not adding item to the cart, already exists!!");
    }
  };

  // Remove an item from the shopping cart
  const removeFromShoppingCart = (name, version) => {
    // Assuming itemName and itemVersion are the values you want to remove
    const updatedCartItems = cartObjNames.filter((item) => {
      const itemName = item[0][0];
      const itemVersion = item[1][0];

      // Return true to keep the item in the array if it doesn't match the condition
      // Return false to remove the item from the array if it matches the condition
      return !(itemName === name && itemVersion === version);
    });

    // Update cartItems with the updated array
    setCartObjNames(updatedCartItems);
    decCartCounter();
  };

  const clearShoppingCart = () => {
    setCartObjNames([]);
    setCartCount(0);
  };

  const handleOpenOverlay = (item) => {
    try {
      const objTuple = obj_map.get(item);

      console.log("objTuple: ");
      console.log(objTuple);

      const objVersions = objTuple[0];
      const objCoords = objTuple[1];

      // Initialize an array to hold the displayData
      var displayData = [];

      // var displayData = "test string";

      // Iterate over objVersions and create OverlayContent components for each version
      objVersions.forEach((objVers, index) => {
        // Get the bounds coordinates for each version of an object
        const itemBounds = {
          bounds: objCoords[index],
        };

        // Create an OverlayContent component and push it into displayData array
        displayData.push(
          <OverlayContent
            key={index} // Ensure each component has a unique key
            name={item}
            version={objVers}
            coords={JSON.stringify(itemBounds)}
            addToShoppingCart={addToShoppingCart}
          />
        );
      });

      // Update the dataToShow state with the generated displayData
      // setDataToShow(<div style={{ overflow: "auto" }}>{displayData}</div>);
      setDataToShow(
        <OverlayContentWrapper
          overlayContentList={displayData}
        ></OverlayContentWrapper>
      );
    } catch (error) {
      console.log("error: " + error);
      setDataToShow(
        <OverlayContentWrapper
          overlayContentList={"No data to show"}
        ></OverlayContentWrapper>
      );
    }

    // setDataToShow(
    //   <div style={{ height: "300px", overflowY: "auto" }}>
    //     {displayData.map((content, index) => (
    //       <div key={index}>{content}</div>
    //     ))}
    //   </div>
    // );

    // // Show the overlay
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    console.log("CALLING HANDLECLOSE OVERYLAAAYYY!!!!!");
    setShowOverlay(false);
    setDataToShow(null);

    setCartPress(0); // close the shopping cart overlay
  };

  ////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const obj_names_api_url = "http://localhost:8000/dspaces/var";

    fetch(obj_names_api_url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        var tempArr = [];

        var temp_obj_map = new Map();

        setObjNames(data);

        data.forEach((name) => {
          tempArr.push(name);

          // const obj_versCoords_api_url =
          //   "http://localhost:9999/dspacesvar/" + name;

          const obj_versCoords_api_url =
            "http://localhost:8000/dspaces/var/" + name;

          fetch(obj_versCoords_api_url)
            .then((response2) => {
              if (!response2.ok) {
                throw new Error("Network response was not ok");
              }
              return response2.json(); // Assuming response is JSON, change accordingly if not
            })
            .then((data2) => {
              // Handle the JSON data received from the API

              // Initialize variables
              const itemVersions = [];
              const itemBounds = [];

              data2.forEach((item) => {
                // Push version to itemVersions array
                itemVersions.push(item.version);

                // // Assuming each item has the same bounds structure, taking bounds of the first item
                itemBounds.push(item.bounds);
              });

              temp_obj_map.set(name, [itemVersions, itemBounds]);
            })
            .catch((error2) => {
              // Handle any errors that occur during the fetch
              console.error(
                "There was a problem with the fetch operation:",
                error2
              );
            });
        });

        setobj_names(tempArr);
        setObj_names_og(tempArr);

        setObj_names_og_order(tempArr);

        setObj_Map(temp_obj_map);
      })

      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const [selectedItemName, setSelectedItemName] = useState("");

  const setSelectedItemNameTitle = (name) => {
    const newTitle = name + " Metadata";
    setSelectedItemName(newTitle);
  };

  const clearSelectedItem = () => {
    setSelectedItemName("");
    setDisplayContent("");
  };

  useEffect(() => {
    filterObjNames(searchBarInput);
  }, [searchPress]);

  const handleSetDisplayContent = (input) => {
    setDisplayContent(input);
  };

  useEffect(() => {
    clearSelectedItem();
    setClearPress(0);
    filterObjNames("");
  }, [clearPress]);

  useEffect(() => {
    if (cartPress) {
      handleOpenOverlayCart();
    }
  }, [cartPress]);

  const filterObjNames = (input) => {
    // Filter objNames based on navbarInput

    if (input === "") {
      setObjNames(obj_names); // Reset to original array if input is empty
      setObj_names_og_order(obj_names_og);
    } else {
      clearSelectedItem();

      // If the search input is included in any item name
      const filteredNames = obj_names.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setObjNames(filteredNames);

      const filteredNames_og_order = obj_names_og_order.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      // obj_names_og_order = filteredNames_og_order;
      setObj_names_og_order(filteredNames_og_order);
    }

    // Set back to not pressed, so we can press again
    setSearchPress(0);
  };

  const restoreObjNamesOrder = () => {
    setObjNames(obj_names_og_order);
  };

  const handleSelectItem = (item) => {
    var content = "";

    content += "Object Name: " + item;
    content += "\n";

    const objTup = obj_map.get(item);

    content += "Version Count: " + objTup[0].length;
    content += "\n";

    handleSetDisplayContent(content);
  };

  return (
    <>
      <div className="marcus-content">
        <DisplayWindow
          title={selectedItemName}
          content={displayContent}
        ></DisplayWindow>
      </div>

      {/* <p>{testState}</p> */}

      <div className="marcus-content">
        {/* The list of objects */}
        <List
          items={objNames} // TODO: change to be a function that fetchest all objNames
          heading="Objects"
          onSelectItem={handleSelectItem}
          // itemMap={obj_map}
          setItems={setObjNames}
          restoreObjNamesOrder={restoreObjNamesOrder}
          setSelectedItemName={setSelectedItemNameTitle}
          searchPress={searchPress}
          clearSelectedItem={clearSelectedItem}
          searchBarInput={searchBarInput}
          clearPress={clearPress}
          handleOpenOverlay={handleOpenOverlay}
        />
      </div>
      {showOverlay && (
        <Overlay onClose={handleCloseOverlay} dataToShow={dataToShow} />
      )}
    </>
  );
}

export default Data;
