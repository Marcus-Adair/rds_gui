import React from "react";

const ShoppingCartListItem = ({ index, tuple, callSomething }) => {
  const doSomething = () => {
    console.log("THE REMOVE BUTTON WAS CLICKEDDDDD!!!!!!!!");
    callSomething(tuple[0][0], tuple[1][0]);
  };

  return (
    <li
      key={index}
      style={{
        marginBottom: "15px",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ marginBottom: "5px" }}>
            <span style={{ fontWeight: "bold" }}>Object Name:</span> {tuple[0]}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Version Number:</span>{" "}
            {tuple[1]}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Spanning Coordinates:</span>{" "}
            {tuple[2]}
          </p>
        </div>

        <button
          className="btn btn-dark"
          // onClick={console.log(
          //   "oooohhh shreeeeettt, the Remove button was clicked"
          // )}
          //   onClick={callSomethingLocal(tuple[0][0], tuple[1][0])}
          onClick={doSomething}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default ShoppingCartListItem;
