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

import { Link } from "react-router-dom";

// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// import ScrollableListContainer from "components/ScrollableListContainer/ScrollableListContainer";
import List from "components/List/List";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import DisplayWindow from "components/DisplayWindow/DisplayWindow";

function Data({ searchBarInput, searchPress, setSearchPress }) {
  // Hardcoded names for retrieving objs from the virtual space
  const obj_names = [
    "exe_obj0",
    "exe_obj1",
    "exe_obj2",
    "exe_obj3",
    "exe_obj4",
    //
    "obj_exe0",
    "obj_exe1",
    "obj_exe2",
    "obj_exe3",
    "obj_exe4",
  ];

  useEffect(() => {
    console.log("Search button pressed:", searchPress);
    filterObjNames(searchBarInput);
  }, [searchPress]);

  // TODO: do some API call to get and set objNames
  const [objNames, setObjNames] = useState(obj_names);

  const [displayContent, setDisplayContent] = useState("");

  const handleSetDisplayContent = (input) => {
    setDisplayContent(input);
  };

  const exe_input = "exe_obj0";

  const filterObjNames = (input) => {
    // Filter objNames based on navbarInput
    if (input === "") {
      setObjNames(obj_names); // Reset to original array if input is empty
    } else {
      // If the search input is included in any item name
      const filteredNames = obj_names.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setObjNames(filteredNames);
    }

    // Set back to not pressed, so we can press again
    setSearchPress(0);
  };

  const handleSelectItem = (
    item
    // obj_name: string,
    // vers_num: number
  ) => {
    // console.log(item);

    // console.log("searchInput:");
    // console.log(searchBarInput);
    // console.log("EndSearchInput:");

    const box = {
      bounds: [
        {
          start: 0,
          span: 9,
        },
      ],
    };

    // Request to get the
    const api_url = "http://localhost:9999/dspaces/obj/" + item + "/0?";

    fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(box),
    })
      .then((response) => {
        // Handle response
        console.log("response success:");
        console.log(response);
        console.log(response.headers);
        console.log(response.json());

        var responseStuff = "";
        responseStuff += item + ": ";
        for (var thing in response) {
          responseStuff += thing + "\n";
        }

        handleSetDisplayContent(responseStuff);
      })
      .catch((error) => {
        // Handle error
        console.log("response failure");
      });
  };

  return (
    <>
      <div className="marcus-content">
        <DisplayWindow title="Objects" content={displayContent}></DisplayWindow>
      </div>

      <div className="marcus-content">
        {/* The list of objects */}
        <List
          items={objNames} // TODO: change to be a function that fetchest all objNames
          heading="Objects"
          onSelectItem={handleSelectItem}
        />
      </div>
    </>
  );
}

export default Data;
