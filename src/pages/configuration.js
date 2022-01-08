import React, { useState } from "react";
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

const Configuration = () => {
  const [mode, setMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passkey, setPasskey] = useState("");

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
      .post("https://calm-beyond-85832.herokuapp.com/users/passkey", data, {
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

  return (
    <SideBar>
      <Card className="about">
        <div style={{ width: "70%", margin: "auto", paddingTop: "30px" }}>
          <div>
            <div style={{ fontSize: "13px", fontWeigth: "900" }}>
              Routing License Number
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "inline-block" }}>
                #{localStorage.getItem("routing")}
              </div>
              <Button
                disabled
                style={{ marginLeft: "40px" }}
                variant="contained"
              >
                Generate New Number
              </Button>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <div style={{ fontSize: "13px", fontWeigth: "900" }}>Passkey</div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "inline-block" }}>
                {" "}
                {passkey || localStorage.getItem("passkey")}
              </div>
              <Button
                onClick={() => setMode(!mode)}
                style={{ marginLeft: "40px" }}
                variant="contained"
              >
                Generate New Passkey
              </Button>
            </div>
          </div>
          {mode && (
            <div>
              <Box
                style={{ width: "400px", margin: "auto", marginTop: "30px" }}
              >
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Passkey
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    style={{ width: "400px" }}
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                  />
                </FormControl>
              </Box>

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
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </SideBar>
  );
};

export default Configuration;
