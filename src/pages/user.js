import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import "../App.css";
import SideBar from "../components/base";
import Content from "../components/content";
import Card from "../components/card";
import { Button, listItemIconClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const NewUser = () => {
  const [passKey, setPasskey] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [packageName, setPackage] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      passkey: passKey,
      routingLicense: license,
      name,
      email,
      package: packageName,
    };
    console.log(data);
    axios
      .post("https://calm-beyond-85832.herokuapp.com/users/register", data)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.hasError === false) {
          toast.success("User created successfully");
          setEmail("");
          setName("");
          setPackage("");
          setPasskey("");
          setLicense("");
        } else {
          toast.error(res.data.message);
        }
      });
  };

  return (
    <SideBar>
      <Card className="about">
        <div
          style={{
            fontSize: "28px",
            marginBottom: "30px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Add New User
        </div>
        <div style={{ width: "70%", margin: "auto", paddingTop: "30px" }}>
          <Box style={{ width: "400px", margin: "auto" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                License Number
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Passkey
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={passKey}
                onChange={(e) => setPasskey(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Select Package
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                style={{ width: "400px" }}
                label="Package"
                value={packageName}
                onChange={(e) => setPackage(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Hatch"}>Hatch</MenuItem>
                <MenuItem value={"Baby"}>Baby</MenuItem>
                <MenuItem value={"Adult"}>Adult</MenuItem>
                <MenuItem value={"Aged"}>Aged</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              onClick={handleSubmit}
              style={{ margin: "30px", display: "flex", alignSelf: "center" }}
              variant="contained"
            >
              {loading ? "Loading..." : "Create"}
            </Button>
          </div>
        </div>
      </Card>
    </SideBar>
  );
};

export default NewUser;
