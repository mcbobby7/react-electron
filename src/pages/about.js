import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import "../App.css";
import SideBar from "../components/base";
import Content from "../components/content";

const About = () => {
  return (
    <SideBar>
      <Content>
        <div className="about">
          <p>Welcome to the About Pages</p>
          <Link className="App-link" to="/">
            Link to Home
          </Link>
          <img className="about-img" width="275" src={Logo} alt="" />
        </div>
      </Content>
    </SideBar>
  );
};

export default About;
