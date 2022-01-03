import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import "../App.css";
import SideBar from "../components/base";
import Content from "../components/content";
import Card from "../components/card";
import moment from "moment";

const Block = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    // axios
    //   .get(
    //     "http://api.coinlayer.com/api/live?access_key=2ee97f2b42f4f5e6184a725199f83fc3"
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     localStorage.setItem("BTC", response.data.rates.BTC);
    //     localStorage.setItem("ETH", response.data.rates.ETH);
    //     localStorage.setItem("LTC", response.data.rates.LTC);
    //     localStorage.setItem("BNB", response.data.rates.BNB);
    //   });
    const interval = setInterval(() => {
      setDate(JSON.parse(localStorage.getItem("minDate")));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <SideBar>
      <Card className="about">
        <div style={{ width: "70%", margin: "auto", paddingTop: "30px" }}>
          <div style={{ fontSize: "28px", marginBottom: "30px" }}>
            Blocks Explorer
          </div>
          <table>
            <tbody>
              <tr style={{ border: "none" }}>
                <th style={{ border: "none" }}>Height</th>
                <td style={{ border: "none" }}>713444</td>
              </tr>
              <tr>
                <th style={{ border: "none" }}>Hash</th>
                <td style={{ border: "none" }}>0856308ffa69</td>
              </tr>
              <tr>
                <th style={{ border: "none" }}>Mined</th>
                <td style={{ border: "none" }}>
                  {moment(date).format("YYYY/MM/DD")}{" "}
                  {moment(date).format("hh:mm a")}
                </td>
              </tr>
              <tr>
                <th style={{ border: "none" }}>Miner</th>
                <td style={{ border: "none" }}>Unknown</td>
              </tr>
              <tr>
                <th style={{ border: "none" }}>Size</th>
                <td style={{ border: "none" }}>1,084,560 byte</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </SideBar>
  );
};

export default Block;
