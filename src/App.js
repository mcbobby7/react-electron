import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/base";
import Card from "./components/card";
import moment from "moment";
import os from "os";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function App() {
  const [BTCvalue, setBTCValue] = useState(0);
  const [ETHvalue, setETHValue] = useState(0);
  const [BNBvalue, setBNBValue] = useState(0);
  const [LTCvalue, setLTCValue] = useState(0);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [date, setDate] = useState("");
  const [coin, setCoin] = useState("BTC");
  const [running, setRunning] = useState(false);
  const [temp, setTemp] = useState(65);
  const [fan, setFan] = useState(41);

  const run = () => {
    const interval = setInterval(() => {
      setTemp(Math.floor(Math.random() * 20) + 35);
      setFan(Math.floor(Math.random() * 31) + 50);
    }, 3000);
    return () => clearInterval(interval);
  };

  const handleWindowClose = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      localStorage.setItem("name", "");
      localStorage.setItem("package", "");
      localStorage.setItem("canMine", "");
      localStorage.setItem("id", "");
      localStorage.setItem("token", "");
      localStorage.setItem("passkey", "");
      localStorage.setItem("routing", "");
      localStorage.setItem("isAdmin", "");
      return;
    });
  };
  useEffect(() => {
    handleWindowClose();
    // var opsys = process;
    // console.log(opsys);
    run();
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
            <div className="nas" style={{ width: "30%", height: "100%" }}>
              <div style={{ height: "20px" }}></div>
              <span>
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
              </span>
            </div>
            <div
              style={{
                width: "68%",
                height: "100%",
              }}
            >
              <div style={{ height: "20px" }}></div>
              {/* <table>
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
                </table> */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Architecture</TableCell>
                      <TableCell align="right">Coin</TableCell>
                      <TableCell align="right">Algorithm</TableCell>
                      <TableCell align="right">Miner</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        NVDIA
                      </TableCell>
                      <TableCell align="right">{coin}</TableCell>
                      <TableCell align="right">Sha256</TableCell>
                      <TableCell align="right">Antminer</TableCell>
                      <TableCell align="right">
                        {running ? "Running" : "Inactive"}
                      </TableCell>
                      <TableCell align="right">35.75g/8</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <div style={{ height: "20px" }}></div>
              {/* <table>
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
                        <td>{temp}°C</td>
                        <td>{item.Power}</td>
                        <td>{item.Core}</td>
                        <td>{item.Memory}</td>
                        <td>{fan}%</td>
                        <td>{item.Utilization}</td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Brand</TableCell>
                      <TableCell align="right">Model</TableCell>
                      <TableCell align="right">Temprature</TableCell>
                      <TableCell align="right">Power</TableCell>
                      <TableCell align="right">Core Clock</TableCell>
                      <TableCell align="right">Memory Clock</TableCell>
                      <TableCell align="right">Fan Speed</TableCell>
                      <TableCell align="right">Utilization</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        NVDIA
                      </TableCell>
                      <TableCell align="right">GeForce</TableCell>
                      <TableCell align="right">{temp}°C</TableCell>
                      <TableCell align="right">153 W</TableCell>
                      <TableCell align="right">1.77 GHZ</TableCell>
                      <TableCell align="right">6.80 GHZ</TableCell>
                      <TableCell align="right">56%</TableCell>
                      <TableCell align="right">{fan}%</TableCell>
                      <TableCell align="right">6.80 GHZ</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default App;
