import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/base";
import Card from "./components/card";
import moment from "moment";
import os from "os";

function App() {
  const [BTCvalue, setBTCValue] = useState(0);
  const [ETHvalue, setETHValue] = useState(0);
  const [BNBvalue, setBNBValue] = useState(0);
  const [LTCvalue, setLTCValue] = useState(0);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [date, setDate] = useState("");
  const [coin, setCoin] = useState("BTC");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    console.log(JSON.parse(user));
    // var opsys = process;
    // console.log(opsys);

    const interval = setInterval(() => {
      setBTCValue(+localStorage.getItem("BTCprice"));
      setETHValue(+localStorage.getItem("ETHprice"));
      setBNBValue(+localStorage.getItem("BNBprice"));
      setLTCValue(+localStorage.getItem("LTCprice"));
      setDate(JSON.parse(localStorage.getItem("minDate")));
      setCoin(localStorage.getItem("coin"));
      setRunning(JSON.parse(localStorage.getItem("isMin")));
    }, 200);
    return () => clearInterval(interval);
  }, [user]);
  const device = [
    {
      Brand: "NVDIA",
      Model: "GeForce",
      Temprature: "68 C",
      Power: "153 W",
      Core: "1.77 GHZ",
      Memory: "6.80 GHZ",
      Fan: "56%",
      Utilization: "89%",
    },
    {
      Brand: "NVDIA",
      Model: "GeForce",
      Temprature: "68 C",
      Power: "153 W",
      Core: "1.77 GHZ",
      Memory: "6.80 GHZ",
      Fan: "56%",
      Utilization: "89%",
    },
  ];
  return (
    <SideBar>
      <div className="App">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div className="status">
              <div className="stat">ETH</div>
              <div className="name">{+ETHvalue}</div>
            </div>
            <div className="status">
              <div className="stat">BNB</div>
              <div className="name">{+BNBvalue}</div>
            </div>
            <div className="status">
              <div className="stat">LTC</div>
              <div className="name">{+LTCvalue}</div>
            </div>
            <div className="status">
              <div className="stat">BTC</div>
              <div className="name">{+BTCvalue}</div>
            </div>
          </div>
          {}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "30%", height: "100%" }}>
              <div style={{ height: "20px" }}></div>
              <Card>
                <div style={{ paddingTop: "20px" }} className="name">
                  Details
                </div>
                <div style={{ paddingTop: "30px" }}>
                  <table>
                    <tbody>
                      <tr style={{ border: "none" }}>
                        <th style={{ border: "none" }}>Type</th>
                        <td style={{ border: "none" }}>Windows</td>
                      </tr>
                      <tr>
                        <th style={{ border: "none" }}>Version</th>
                        <td style={{ border: "none" }}>1.1.1</td>
                      </tr>
                      <tr>
                        <th style={{ border: "none" }}>Coin</th>
                        <td style={{ border: "none" }}>{coin}</td>
                      </tr>
                      <tr>
                        <th style={{ border: "none" }}>Last Mined</th>
                        <td style={{ border: "none" }}>
                          {moment(date).format("YYYY/MM/DD")}{" "}
                          {moment(date).format("hh:mm a")}
                        </td>
                      </tr>
                      <tr>
                        <th style={{ border: "none" }}>IP</th>
                        <td style={{ border: "none" }}>-- -- --</td>
                      </tr>
                      <tr>
                        <th style={{ border: "none" }}>MAC</th>
                        <td style={{ border: "none" }}>-- -- -- --</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            <div
              style={{
                width: "68%",
                height: "100%",
              }}
            >
              <div style={{ height: "20px" }}></div>
              <Card>
                <table>
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderBottom: "0",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        colSpan={4}
                      >
                        Active Mining
                      </th>
                    </tr>
                    <tr>
                      <th>Architecture</th>
                      <th>Coin</th>
                      <th>Algorithm</th>
                      <th>Miner</th>
                      <th>Status</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>NVDIA</td>
                      <td>{coin}</td>
                      <td>Sha256</td>
                      <td>Antminer</td>
                      <td>{running ? "Running" : "Inactive"}</td>
                      <td>35.75g/8</td>
                    </tr>
                  </tbody>
                </table>
              </Card>

              <div style={{ height: "20px" }}></div>
              <Card>
                <table>
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderBottom: "0",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        colSpan={4}
                      >
                        Hardware
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{
                          borderBottom: "0",
                          fontSize: "11px",
                        }}
                        colSpan={4}
                      >
                        CPU
                      </th>
                    </tr>
                    <tr>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>Temprature</th>
                      <th>Power</th>
                      <th>Core Clock</th>
                      <th>Memory Clock</th>
                      <th>Fan Speed</th>
                      <th>Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {device.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Brand}</td>
                        <td>{item.Model}</td>
                        <td>{item.Temprature}</td>
                        <td>{item.Power}</td>
                        <td>{item.Core}</td>
                        <td>{item.Memory}</td>
                        <td>{item.Fan}</td>
                        <td>{item.Utilization}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default App;
