import React, { useState } from "react";
import { NavItem } from "reactstrap";
import { Link } from "react-router-dom";

const ShoppingCart = ({ handleCartButtonPress, cartCount }) => {
  //   const [cartCount, setCartCount] = useState(0);

  //   const incCartCounter = () => {
  //     setCartCount(cartCount + 1);
  //   };

  const handleCartButtonPressLocal = () => {
    // Add item to cart and update cart count

    handleCartButtonPress();
    // setCartCount(cartCount + 1);
  };

  return (
    <NavItem>
      <Link to="#pablo" className="nav-link btn-rotate">
        <div style={{ position: "relative" }}>
          <i
            className="nc-icon nc-cart-simple"
            onClick={handleCartButtonPressLocal}
          />
          {cartCount > 0 && (
            <div
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                backgroundColor: "red",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "12px",
              }}
            >
              {cartCount}
            </div>
          )}
        </div>
      </Link>
    </NavItem>
  );
};

export default ShoppingCart;
