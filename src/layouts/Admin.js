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
import React from "react";

import { useState } from "react";
import Data from "views/Data.js";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();

  const [searchBarInput, setSearchBarInput] = React.useState("");
  const [searchPress, setSearchPress] = React.useState(0);

  // Function to handle changes in navbarInput
  const handleNavbarInputChange = (input) => {
    setSearchBarInput(input);
    // console.log(searchBarInput);
  };

  // Function to handle when the search button is pressed
  const handleSearchButtonPress = () => {
    console.log("searchbarinput: ");
    console.log(searchBarInput);

    setSearchPress(1);

    // TODO: pass the input to the Data View

    // TODO: inside of the data, when input changes, filter objs
  };

  const handleClearButtonAdmin = () => {
    setSearchPress(1);
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        {/* Navbar */}
        <DemoNavbar
          {...props}
          handleNavbarInputChange={(event) => handleNavbarInputChange(event)}
          handleSearchButtonPress={() => handleSearchButtonPress()}
          handleClearButtonAdmin={() => handleClearButtonAdmin()}
        />

        {/* Route to the View */}
        <Routes>
          <Route
            path={"/data"}
            element={
              <Data
                searchBarInput={searchBarInput}
                searchPress={searchPress}
                setSearchPress={setSearchPress}
              />
            }
            exact
          />
          {/* {routes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                element={prop.component}
                key={key}
                exact
              />
            );
          })} */}
        </Routes>

        <Footer fluid />
      </div>

      {/* <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */}
    </div>
  );
}

export default Dashboard;
