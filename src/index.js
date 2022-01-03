import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "./App";
import About from "./pages/about";
import Device from "./pages/device";
import Configurations from "./pages/configuration";
import Block from "./pages/block";
import Wallet from "./pages/wallet";
import AllUsers from "./pages/allUsers";
import SingleUser from "./pages/singleUser";
import NewUser from "./pages/user";
import Login from "./pages/login";
import History from "./pages/history";
import Withraw from "./pages/withraw";
import Convert from "./pages/convert";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.render(
  <Router>
    <div>
      <ToastContainer />

      <main>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="/device" component={Device} />
        <Route path="/about" component={About} />
        <Route path="/configurations" component={Configurations} />
        <Route path="/blocks" component={Block} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/newUser" component={NewUser} />
        <Route path="/user/:id" component={SingleUser} />
        <Route path="/allUsers" component={AllUsers} />
        <Route path="/history" component={History} />
        <Route path="/withrawal" component={Withraw} />
        <Route path="/convert" component={Convert} />
      </main>
    </div>
  </Router>,
  document.getElementById("root")
);
