import React from "react";

const OverlayContent = ({ name, version, coords, addToShoppingCart }) => {
  const callAddToShoppingCart = () => {
    // const addToCart = { name, version, coords };

    const addToCart = [[name], [version], [coords]];

    addToShoppingCart(addToCart);
  };

  const handleDownload = async () => {
    // Create a Blob object with the text content

    console.log("DOWNLOADING DATAAAA!!!!");

    // const api_url = `http://localhost:9999/dspaces/obj/${name}/${version}?timeout=100`;
    const api_url = `http://localhost:8000/dspaces/obj/${name}/${version}`;

    fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: coords,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error " + response.status);
        }
      })
      .then((data) => {
        // DOWNLOADED CONTENT
        const downloadContent =
          "Object Name: " +
          name +
          "\n\n" +
          "Object Version: " +
          version +
          "\n\n" +
          "Object Coordinates: " +
          coords +
          "\n\n" +
          "Object Content: " +
          data.content;

        const blob = new Blob([downloadContent], { type: "text/plain" });

        // Create a temporary <a> element to trigger the download
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = name + ".txt";
        document.body.appendChild(a);
        a.click();
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  const newline = "\n";
  return (
    <div className="overlay-content" style={{ overflowY: "auto" }}>
      {/* Content to display in the overlay */}

      <div>
        <p className="overlay-text-content" style={{ whiteSpace: "pre-line" }}>
          <span style={{ fontWeight: "bold" }}>Object Name:</span>
          {newline}
          {name}
        </p>

        <p className="overlay-text-content" style={{ whiteSpace: "pre-line" }}>
          <span style={{ fontWeight: "bold" }}>Version:</span>
          {newline}
          {version}
        </p>

        <p className="overlay-text-content" style={{ whiteSpace: "pre-line" }}>
          <span style={{ fontWeight: "bold" }}>DataSpace Coordinates:</span>
          {newline}
          {coords}
        </p>
      </div>

      <button
        className="btn btn-light"
        onClick={handleDownload}
        title="Download Object"
      >
        Download
      </button>

      <button
        className="btn btn-light"
        // onClick={handleDownload}
        title="Add Object to Shopping Cart!!!"
        // onClick={addToShoppingCart("hello worldd!!!!")}

        onClick={callAddToShoppingCart}
      >
        Add to Shopping Cart
      </button>
    </div>
  );
};

export default OverlayContent;
