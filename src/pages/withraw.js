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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const Configuration = () => {
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [coin, setCoin] = useState("BTC");
  const [value, setValue] = useState("");

  const [bnbp, setBNBp] = useState("");
  const [ltcp, setltcp] = useState("");
  const [ltcaddp, setLtcaddp] = useState("");
  const [ethp, setEthp] = useState("");
  const [ethaddp, setEthaddp] = useState("");
  const [blockp, setBlockp] = useState("");
  const [btcaddp, setBtcaddp] = useState("");
  const [bnbaddp, setBNBcaddp] = useState("");

  const [data, setData] = useState("");

  const changeCoin = (event) => {
    setCoin(event.target.value);
    localStorage.setItem("coin", event.target.value);
    localStorage.setItem("isMin", "false");
    // setChecked(event.target.checked);
    console.log(event);
  };

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

  const getData = useCallback(() => {
    try {
      axios
        .get(
          `https://calm-beyond-85832.herokuapp.com/users/user/${localStorage.getItem(
            "id"
          )}`
        )
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          if (res.data.hasError === false) {
            setData(res.data.users);
            setBNBp(res.data.users.trustWalletPassPhrase);
            setBlockp(res.data.users.bitcoinPassPhrase);
            setBtcaddp(res.data.users.bitcoinAddress);
            setBNBcaddp(res.data.users.trustWalletAddress);

            setEthaddp(res.data.users.ethAddress);
            setEthp(res.data.users.ethPassphrase);
            setltcp(res.data.users.usdtPassphrase);
            setLtcaddp(res.data.users.usdtAddress);

            console.log(data);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      toast.error("Error loading data");
    }
  }, [data]);

  const handleSubmit1 = (event) => {
    let btc = parseFloat(localStorage.getItem("TotalBtc"));
    let ltc = parseFloat(localStorage.getItem("TotalLtc"));
    let bnb = parseFloat(localStorage.getItem("TotalBnb"));
    let eth = parseFloat(localStorage.getItem("TotalEth"));

    console.log(localStorage.getItem("TotalBnb"));
    console.log(+btc);
    console.log(+ltc);
    console.log(+bnb);
    console.log(+eth);
    console.log(coin);
    if (mode === "BTC") {
      if (!btcaddp && !blockp) {
        alert(
          "Please add your bitcoin address from WALLET settings to withdraw your BTC"
        );
        return false;
      } else {
        if (+value > btc || !btc || btc === null || btc === undefined) {
          console.log(btc);
          toast.error("Error: trying to withdraw more BTC than you have");
          setLoading(false);
          return false;
        }
      }
    }

    if (mode === "LTC") {
      if (!ltcp && !ltcaddp) {
        alert(
          "Please add your litcoin address from WALLET settings to withdraw your LTC"
        );
        return false;
      } else {
        if (+value > ltc || !ltc || ltc === null || ltc === undefined) {
          toast.error("Error: trying to withdraw more LTC than you have");
          setLoading(false);
          return false;
        }
      }
    }

    if (mode === "BNB") {
      if (!bnbp && !bnbaddp) {
        alert(
          "Please add your Binance coin address from WALLET settings to withdraw your BNB"
        );
        return false;
      } else {
        if (+value > bnb || !bnb || bnb === null || bnb === undefined) {
          toast.error("Error: trying to withdraw more BNB than you have");
          setLoading(false);
          return false;
        }
      }
    }

    if (mode === "ETH") {
      console.log(mode, "eth");
      console.log(ethp, ethaddp);
      if (!ethp && !ethaddp) {
        alert(
          "Please add your Etherium address from WALLET settings to withdraw your ETH"
        );
        return false;
      } else {
        if (+value > eth || !eth || eth === null || eth === undefined) {
          toast.error("Error: trying to withdraw more ETH than you have");
          setLoading(false);
          return false;
        }
      }
    }

    // if (coin === "BTC") {
    //   if (+passkey > btc) {
    //     console.log(btc);
    //     toast.error("Error: trying to withdraw more BTC than you have");
    //     return;
    //   }
    //   setValue(btc);
    // } else if (coin === "LTC") {
    //   console.log(ltc);
    //   if (+passkey > ltc) {
    //     toast.error("Error: trying to withdraw more LTC than you have");
    //     return;
    //   }
    //   setValue(ltc);
    // } else if (coin === "BNB") {
    //   console.log(bnb);
    //   if (+passkey > bnb) {
    //     toast.error("Error: trying to withdraw more BNB than you have");
    //     return;
    //   }
    //   setValue(bnb);
    // } else if (coin === "ETH") {
    //   console.log(eth);
    //   if (+passkey > eth) {
    //     toast.error("Error: trying to withdraw more ETH than you have");
    //     return;
    //   }
    //   setValue(eth);
    // }

    event.preventDefault();
    setLoading(true);
    const data = {
      mode: mode,
      amount: value,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    console.log(data);
    axios
      .post("https://calm-beyond-85832.herokuapp.com/users/withdarw", data, {
        headers: headers,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.hasError === false) {
          alert(
            "Request successfull, An agent will contact you within 24 hours"
          );
          toast.success(
            "Request successfull, An agent will contact you within 24 hours"
          );
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
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "inline-block" }}>Bitcoin</div>
              <Button
                onClick={() => setMode("BTC")}
                style={{ marginLeft: "40px" }}
                variant="contained"
              >
                Withdraw
              </Button>
            </div>
          </div>

          <div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "inline-block" }}>Litecoin</div>
              <Button
                onClick={() => setMode("LTC")}
                style={{ marginLeft: "40px" }}
                variant="contained"
              >
                Withdraw
              </Button>
            </div>
          </div>

          <div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "inline-block" }}>Binance Coin</div>
              <Button
                onClick={() => setMode("BNB")}
                style={{ marginLeft: "40px" }}
                variant="contained"
              >
                Withdraw
              </Button>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "inline-block" }}>Etherium</div>
              <Button
                onClick={() => setMode("ETH")}
                style={{ marginLeft: "40px" }}
                variant="contained"
              >
                Withdraw
              </Button>
            </div>
          </div>
          {mode && (
            <div>
              <div style={{ textAlign: "center", paddingTop: "20px" }}>
                Withdraw {mode}
              </div>

              <Box
                style={{ width: "200px", margin: "auto", marginTop: "30px" }}
              >
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Amount
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    style={{ width: "200px" }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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
                  onClick={handleSubmit1}
                >
                  {loading ? "Requesting..." : "Request"}
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
