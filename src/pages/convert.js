import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import "../App.css";
import SideBar from "../components/base";
import Content from "../components/content";
import Card from "../components/card";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Configuration = () => {
  const [mode, setMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [from, setFrom] = useState("BTC");
  const [to, setTo] = useState("ADA");
  const [amount, setAmount] = useState("0");
  const [BTCvalue, setBTCValue] = useState(0);
  const [ETHvalue, setETHValue] = useState(0);
  const [BNBvalue, setBNBValue] = useState(0);
  const [LTCvalue, setLTCValue] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      passkey: passkey,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/users/passkey", data, {
        headers: headers,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.hasError === false) {
          toast.success("Updated successfully");
          localStorage.setItem("passkey", passkey);
          setMode(false);
        } else {
          toast.error(res.data.message);
        }
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBTCValue(localStorage.getItem("TotalBtc"));
      setETHValue(localStorage.getItem("TotalEth"));
      setBNBValue(localStorage.getItem("TotalBnb"));
      setLTCValue(localStorage.getItem("TotalLtc"));
    }, 200);
    return () => clearInterval(interval);

    // return () => {
    //   isMounted = false;
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SideBar>
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
      <Card className="about">
        <div style={{ width: "70%", margin: "auto", paddingTop: "30px" }}>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                From
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                style={{ width: "400px" }}
                label="Package"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <MenuItem value="BTC">BTC</MenuItem>
                <MenuItem value="ETH">ETH</MenuItem>
                <MenuItem value="LTC">LTC</MenuItem>
                <MenuItem value="BNB">BNB</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">To</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                style={{ width: "400px" }}
                label="Package"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <MenuItem value="ADA">ADA</MenuItem>
                <MenuItem value="MATIC">MATIC</MenuItem>
                <MenuItem value="DODGE">DODGE</MenuItem>
                <MenuItem value="LTC">LTC</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Amount
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
          </Box>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                style={{
                  margin: "30px",
                  display: "flex",
                  alignSelf: "center",
                }}
                variant="contained"
                onClick={handleSubmit}
              >
                {loading ? "Converting..." : "Convert"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </SideBar>
  );
};

export default Configuration;
