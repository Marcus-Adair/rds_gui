import React, { useState, useEffect } from "react";
// import ShoppingCartList from "components/List/ShoppingCartList";
import ShoppingCartListItem from "components/ShoppingCartListItem/ShoppingCartListItem";

const OverlayContentCart = ({
  cartObjNames,
  clearShoppingCart,
  removeFromShoppingCart,
}) => {
  const [cartItemCount, setCartItemCount] = useState(cartObjNames.length);

  const clearShoppingCartLocal = () => {
    clearShoppingCart();
    setCartItemCount(0);
  };

  const callSomething = (name, version) => {
    console.log("fasdfasdfa oh shreeetsdfs!!! " + name + " " + version);
  };

  const removeFromShoppingCartLocal = (name, version) => {
    console.log(
      "CALLING REMOVE FROM SHOPPING CART!!!  name: " +
        name +
        " version: " +
        version
    );
  };

  useEffect(() => {
    // Update cartItemCount when cartObjNames changes
    setCartItemCount(cartObjNames.length);
  }, [cartObjNames]); // Dependency array to watch for changes in cartObjNames

  return (
    <div>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {" "}
        {cartItemCount === 0 ? (
          <div>
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {cartObjNames.map((tuple, index) => (
                <ShoppingCartListItem
                  key={index}
                  index={index}
                  tuple={tuple}
                  callSomething={removeFromShoppingCart}
                ></ShoppingCartListItem>
              ))}
            </ul>
          </div>
        )}
      </div>

      {cartObjNames.length !== 0 && (
        <div style={{ position: "sticky" }}>
          <button className="btn btn-light" title="Download Objects">
            Download
          </button>
          <button
            className="btn btn-light"
            title="Clear Shopping Cart"
            onClick={clearShoppingCartLocal}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default OverlayContentCart;
