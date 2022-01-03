import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import "../App.css";
import SideBar from "../components/base";
import Content from "../components/content";
import Card from "../components/card";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";

const Block = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [packageName, setPackage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      message,
      id,
    };
    console.log(data);
    axios.post("http://localhost:5000/users/notification", data).then((res) => {
      setLoading(false);
      console.log(res);
      if (res.data.hasError === false) {
        toast.success("Notification sent successfully");
        setMessage("");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getData = useCallback(() => {
    try {
      axios.get(`http://localhost:5000/users/user/${id}`).then((res) => {
        setLoading(false);
        console.log(res.data.hasError);
        if (res.data.hasError === false) {
          setLoading(false);
          console.log(data);
          let user = res.data.users;
          setData(user);
          setPackage(data.package);
          console.log(data.package);
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      toast.error("Error loading data");
    }
  }, [data, id]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getData();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const label = { inputProps: { "aria-label": "Switch Mine" } };
  const reload = () => {
    try {
      axios.get(`http://localhost:5000/users/user/${id}`).then((res) => {
        setLoading(false);
        console.log(res.data.hasError);
        if (res.data.hasError === false) {
          setLoading(false);
          console.log(data);
          let user = res.data.users;
          setData(user);
          setPackage(data.package);
          console.log(res.data.users);
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      toast.error("Error loading data");
    }
  };
  const setNew = (value) => {
    setLoading(true);
    const data = {
      id: id,
      value: value,
    };
    axios.post(`http://localhost:5000/users/package`, data).then((res) => {
      setLoading(false);
      console.log(data);
      console.log(res);
      console.log(res.data.hasError);
      reload();
      if (res.data.hasError === false) {
        setLoading(false);
        console.log(data);
        toast.success("Successfull");
      } else {
        toast.error(res.data.message);
      }
    });
  };
  const handleChange = (event) => {
    setLoading(true);
    console.log(event.target.checked);
    const data = {
      id: id,
      value: event.target.checked,
    };
    axios.post(`http://localhost:5000/users/canMine`, data).then((res) => {
      setLoading(false);
      console.log(data);
      console.log(res);
      console.log(res.data.hasError);
      reload();
      if (res.data.hasError === false) {
        setLoading(false);
        console.log(data);
        toast.success("Successfull");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  return (
    <SideBar>
      <Card className="about">
        <div style={{ width: "70%", margin: "auto", paddingTop: "30px" }}>
          <div style={{ fontSize: "28px", marginBottom: "30px" }}>User</div>
          {!loading ? (
            <table>
              <tbody>
                <tr style={{ border: "none" }}>
                  <th style={{ border: "none" }}>Name</th>
                  <td style={{ border: "none" }}>{data.name}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>Email</th>
                  <td style={{ border: "none" }}>{data.email}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>Package</th>
                  <td style={{ border: "none" }}>
                    {data.package}{" "}
                    <select
                      value={packageName}
                      onChange={(e) => [
                        setPackage(e.target.value),
                        setNew(e.target.value),
                      ]}
                    >
                      <option value="Hatch">Hatch</option>
                      <option value="Baby">Baby</option>
                      <option value="Adult">Adult</option>
                      <option value="Aged">Aged</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>Can Mine</th>
                  <td style={{ border: "none" }}>
                    <Switch
                      checked={data.canMine}
                      onChange={handleChange}
                      {...label}
                      color="default"
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>Passkey</th>
                  <td style={{ border: "none" }}>{data.passkey}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>Routing Number</th>
                  <td style={{ border: "none" }}>{data.routingLicense}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>BTC</th>
                  <td style={{ border: "none" }}>{data.btc}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>ETH</th>
                  <td style={{ border: "none" }}>{data.eth}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>BNB</th>
                  <td style={{ border: "none" }}>{data.bnb}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>LTC</th>
                  <td style={{ border: "none" }}>{data.ltc}</td>
                </tr>

                <tr>
                  <th style={{ border: "none" }}>Bitcoin PassPhrase</th>
                  <td style={{ border: "none" }}>{data.bitcoinPassPhrase}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>Bitcoin Address</th>
                  <td style={{ border: "none" }}>{data.bitcoinAddress}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>BNB PassPhrase</th>
                  <td style={{ border: "none" }}>
                    {data.trustWalletPassPhrase}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>BNB Address</th>
                  <td style={{ border: "none" }}>{data.trustWalletAddress}</td>
                </tr>

                <tr>
                  <th style={{ border: "none" }}>ETH Address</th>
                  <td style={{ border: "none" }}>{data.ethAddress}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>ETH Passphrase</th>
                  <td style={{ border: "none" }}>{data.ethPassphrase}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>LTC Address</th>
                  <td style={{ border: "none" }}>{data.usdtAddress}</td>
                </tr>
                <tr>
                  <th style={{ border: "none" }}>LTC Passphrase</th>
                  <td style={{ border: "none" }}>{data.usdtPassphrase}</td>
                </tr>

                {/* {data.walletAddress &&
                  data.walletAddress.map((rows) => (
                    <tr>
                      <th style={{ border: "none" }}>
                        {rows.coin}
                        <br />
                        {rows.address}
                      </th>
                      <td style={{ border: "none" }}>{rows.passPhrase}</td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "100px",
                paddingBottom: "200px",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
        <div style={{ fontSize: "28px", margin: "30px", textAlign: "center" }}>
          Send Notification
        </div>
        <Box style={{ width: "400px", margin: "auto" }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Message</InputLabel>
            <Input
              id="input-with-icon-adornment"
              style={{ width: "400px" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              style={{ margin: "30px", display: "flex", alignSelf: "center" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Send
            </Button>
          </div>
        </Box>
      </Card>
    </SideBar>
  );
};

export default Block;
