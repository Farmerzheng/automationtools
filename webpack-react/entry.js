// var name=require('./name');
// import name from "./name";
// require("style!css!./style.css")
// require("./style.css");
// import "./style.css";

// document.getElementById("div1").innerText="hello~"+name;
'use strict';
import Name from "./name";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
     <Name/>,
     document.getElementById("div1")
	)
