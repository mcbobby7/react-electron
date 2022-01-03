import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MessageIcon from "@mui/icons-material/Message";
import Menu from "@mui/material/Menu";
import "./styles.css";
const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const history = useHistory();

  const { onDrawerToggle } = props;
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [int, SetInt] = useState(100);
  const [coin, setCoin] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkeStatus, setCheckeStatus] = useState(true);
  const [notification, setNotification] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [read, setRead] = useState(false);
  const [btc, setbtc] = React.useState("");
  const [ltc, setltc] = React.useState("");
  const [bnb, setbnb] = React.useState("");
  const [eth, seteth] = React.useState("");

  const [btc1, setbtc1] = React.useState("");
  const [ltc1, setltc1] = React.useState("");
  const [bnb1, setbnb1] = React.useState("");
  const [eth1, seteth1] = React.useState("");

  const [btc2, setbtc2] = React.useState("");
  const [ltc2, setltc2] = React.useState("");
  const [bnb2, setbnb2] = React.useState("");
  const [eth2, seteth2] = React.useState("");

  const [btc3, setbtc3] = React.useState("");
  const [ltc3, setltc3] = React.useState("");
  const [bnb3, setbnb3] = React.useState("");
  const [eth3, seteth3] = React.useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const fetch = () => {

  // };

  useEffect(() => {
    if (
      !localStorage.getItem("id") ||
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") === undefined
    ) {
      history.push("login");
    }
    axios.get("http://localhost:5000/users/getRate").then((res) => {
      console.log(res);
      if (res.data.hasError === false) {
        console.log(res.data.rate[0]);
        setbtc(res.data.rate[0].btc);
        setltc(res.data.rate[0].ltc);
        setbnb(res.data.rate[0].bnb);
        seteth(res.data.rate[0].eth);
        localStorage.setItem("setbtc", res.data.rate[0].btc);
        localStorage.setItem("setltc", res.data.rate[0].ltc);
        localStorage.setItem("setbnb", res.data.rate[0].bnb);
        localStorage.setItem("seteth", res.data.rate[0].eth);

        setbtc1(res.data.rate[0].btc1);
        setltc1(res.data.rate[0].ltc1);
        setbnb1(res.data.rate[0].bnb1);
        seteth1(res.data.rate[0].eth1);
        localStorage.setItem("setbtc1", res.data.rate[0].btc1);
        localStorage.setItem("setltc1", res.data.rate[0].ltc1);
        localStorage.setItem("setbnb1", res.data.rate[0].bnb1);
        localStorage.setItem("seteth1", res.data.rate[0].eth1);

        setbtc2(res.data.rate[0].btc2);
        setltc2(res.data.rate[0].ltc2);
        setbnb2(res.data.rate[0].bnb2);
        seteth2(res.data.rate[0].eth2);
        localStorage.setItem("setbtc2", res.data.rate[0].btc2);
        localStorage.setItem("setltc2", res.data.rate[0].ltc2);
        localStorage.setItem("setbnb2", res.data.rate[0].bnb2);
        localStorage.setItem("seteth2", res.data.rate[0].eth2);

        setbtc3(res.data.rate[0].btc3);
        setltc3(res.data.rate[0].ltc3);
        setbnb3(res.data.rate[0].bnb3);
        seteth3(res.data.rate[0].eth3);
        localStorage.setItem("setbtc3", res.data.rate[0].btc3);
        localStorage.setItem("setltc3", res.data.rate[0].ltc3);
        localStorage.setItem("setbnb3", res.data.rate[0].bnb3);
        localStorage.setItem("seteth3", res.data.rate[0].eth3);
      } else {
        toast.error(res.data.message);
      }
    });
    setCoin(localStorage.getItem("coin"));
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .get("http://localhost:5000/users/notificationGet", {
        headers: headers,
      })
      .then((res) => {
        setNotification(res.data.notif.reverse());
        for (let i = 0; i < notification.length; i++) {
          if (notification[i].isSeen === false) {
            setRead(true);
          }
        }
        console.log(notification);
      })
      .catch((err) => {
        toast.error("cannot load notifications");
      });

    localStorage.setItem("notification", parseInt(notification.length));
    console.log(notification.length);
    console.log(localStorage.getItem("notification"));
    let packageName = localStorage.getItem("package");
    if (packageName === "Hatch") {
      SetInt(500);
    } else if (packageName === "Baby") {
      SetInt(400);
    } else if (packageName === "Adult") {
      SetInt(300);
    } else if (packageName === "Aged") {
      SetInt(200);
    }
    resetDate();
    if (
      !localStorage.getItem("isMin") ||
      localStorage.getItem("isMin") == null ||
      localStorage.getItem("isMin") == undefined
    ) {
      localStorage.setItem("isMin", "false");
    }
    if (
      !localStorage.getItem("coin") ||
      localStorage.getItem("coin") == null ||
      localStorage.getItem("coin") == undefined
    ) {
      localStorage.setItem("coin", "BTC");
    }
    localStorage.setItem("rate", "160.31");
    localStorage.setItem("mined", "0");
    localStorage.setItem("plan", "4");
    localStorage.setItem("mineRate", "0");

    if (!localStorage.getItem("BTCprice")) {
      localStorage.setItem("BTCprice", "0.00000000");
      localStorage.setItem("TotalBtc", "0.00000000");
    }
    if (!localStorage.getItem("ETHprice")) {
      localStorage.setItem("ETHprice", "0.00000000");
      localStorage.setItem("TotalEth", "0.00000000");
    }
    if (!localStorage.getItem("LTCprice")) {
      localStorage.setItem("LTCprice", "0.00000000");
      localStorage.setItem("TotalLtc", "0.00000000");
    }
    if (!localStorage.getItem("BNBprice")) {
      localStorage.setItem("BNBprice", "0.00000000");
      localStorage.setItem("TotalBnb", "0.00000000");
    }
    try {
      axios
        .get(`http://localhost:5000/users/user/${localStorage.getItem("id")}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.hasError === false) {
            localStorage.setItem("package", res.data.users.package);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      toast.error("Network error please try again");
    }

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
    const checkMineStatus = () => {
      if (packageName === "Hatch") {
        if (
          +localStorage.getItem("BTCprice") >= +localStorage.getItem("setbtc")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("LTCprice") >= +localStorage.getItem("setltc")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("BNBprice") >= +localStorage.getItem("setbnb")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("ETHprice") >= +localStorage.getItem("seteth")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        }
      } else if (packageName === "Baby") {
        if (
          +localStorage.getItem("BTCprice") >= +localStorage.getItem("setbtc1")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("LTCprice") >= +localStorage.getItem("setltc1")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("BNBprice") >= +localStorage.getItem("setbnb1")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("ETHprice") >= +localStorage.getItem("seteth1")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        }
      } else if (packageName === "Adult") {
        if (
          +localStorage.getItem("BTCprice") >= +localStorage.getItem("setbtc2")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("LTCprice") >= +localStorage.getItem("setltc2")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("BNBprice") >= +localStorage.getItem("setbnb2")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("ETHprice") >= +localStorage.getItem("seteth2")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        }
      } else if (packageName === "Aged") {
        if (
          +localStorage.getItem("BTCprice") >= +localStorage.getItem("setbtc3")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("LTCprice") >= +localStorage.getItem("setltc3")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("BNBprice") >= +localStorage.getItem("setbnb3")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        } else if (
          +localStorage.getItem("ETHprice") >= +localStorage.getItem("seteth3")
        ) {
          setCheckeStatus(false);
          localStorage.setItem("isMin", "false");
          localStorage.setItem("check", "false");
          setChecked(false);
          toast.warn("You have reached the dialy mining limit for your plan");
        }
      }
    };
    const interval = setInterval(() => {
      resetDate();
      if (checkeStatus) {
        checkMineStatus();
      }
      setChecked(JSON.parse(localStorage.getItem("check")));

      if (localStorage.getItem("isMin") === "true") {
        localStorage.setItem("minDate", JSON.stringify(new Date()));
        if (localStorage.getItem("coin") === "BTC") {
          let price = +localStorage.getItem("BTCprice") + 0.00000001;
          let Totalprice = +localStorage.getItem("TotalBtc") + 0.00000001;
          localStorage.setItem("BTCprice", price);
          localStorage.setItem("TotalBtc", Totalprice);
          console.log("mining BTC");
        } else if (localStorage.getItem("coin") === "LTC") {
          let price = +localStorage.getItem("LTCprice") + 0.00000001;
          let Totalprice = +localStorage.getItem("TotalLtc") + 0.00000001;
          localStorage.setItem("LTCprice", price);
          localStorage.setItem("TotalLtc", Totalprice);
        } else if (localStorage.getItem("coin") === "BNB") {
          let price = +localStorage.getItem("BNBprice") + 0.00000001;
          let Totalprice = +localStorage.getItem("TotalBnb") + 0.00000001;
          localStorage.setItem("BNBprice", price);
          localStorage.setItem("TotalBnb", Totalprice);
        } else if (localStorage.getItem("coin") === "ETH") {
          let price = +localStorage.getItem("ETHprice") + 0.00000001;
          let Totalprice = +localStorage.getItem("TotalEth") + 0.00000001;
          localStorage.setItem("ETHprice", price);
          localStorage.setItem("TotalEth", Totalprice);
        }
      }
    }, int);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkeStatus, int]);
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: pink[600],
      "&:hover": {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: pink[600],
    },
  }));

  const resetDate = () => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    const newdate = year + "/" + month + "/" + day;
    if (localStorage.getItem("date") !== newdate) {
      console.log("nooo");
      const dailyTransaction = {
        date: localStorage.getItem("date"),
        ETH: localStorage.getItem("ETHprice"),
        BTC: localStorage.getItem("BTCprice"),
        LTC: localStorage.getItem("LTCprice"),
        BNB: localStorage.getItem("BNBprice"),
        totalBNB: localStorage.getItem("BNBprice"),
        totalLTC: localStorage.getItem("BNBprice"),
        totalBTC: localStorage.getItem("BNBprice"),
        totalETH: localStorage.getItem("BNBprice"),
      };
      let data = JSON.parse(localStorage.getItem("transactions"));

      if (!data || data.lenngth === 0 || data === null || data === undefined) {
        localStorage.setItem(
          "transactions",
          JSON.stringify([dailyTransaction])
        );
      } else {
        data.push(dailyTransaction);
        localStorage.setItem("transactions", JSON.stringify(data));
      }
      localStorage.setItem("BTCprice", "0.00000000");
      localStorage.setItem("ETHprice", "0.00000000");
      localStorage.setItem("LTCprice", "0.00000000");
      localStorage.setItem("BNBprice", "0.00000000");
    }
    localStorage.setItem("date", newdate);
  };
  const handleChange = (event) => {
    if (!checkeStatus) {
      toast.warn("You have reached the dialy mining limit for your plan");
      localStorage.setItem("isMin", "false");
      setChecked(false);
      return false;
    }
    try {
      axios
        .get(`http://localhost:5000/users/user/${localStorage.getItem("id")}`)
        .then((res) => {
          console.log(res.data);
          let data = res.data.users;
          if (res.data.hasError === false) {
            localStorage.setItem("package", res.data.users.package);
            if (!data.canMine) {
              toast.error(
                "Error: sorry this account cannot mine at the moment"
              );
              localStorage.setItem("isMin", "false");
              setChecked(false);
              return false;
            }
          } else {
            toast.error(res.data.message);
            localStorage.setItem("isMin", "false");
            setChecked(false);
            return false;
          }
        });
    } catch (error) {
      toast.error("Network error please try again");
    }
    if (checked) {
      localStorage.setItem("isMin", "false");
    } else {
      localStorage.setItem("isMin", "true");
    }

    localStorage.setItem("check", JSON.stringify(event.target.checked));
    let rate = localStorage.getItem("rate");
    let coinRate = localStorage.getItem(coin);
    let mineRate = +rate / coinRate;
    let mineSec = mineRate / 14000;
    console.log("coinRate", coinRate);
    console.log("Rate", rate);
    console.log("minRate", mineRate.toFixed(8));
    console.log("minSec", mineSec);
    localStorage.setItem("mineRate", mineRate.toFixed(8));
    localStorage.setItem("mineSec", mineSec);
  };
  const changeCoin = (event) => {
    setCoin(event.target.value);
    localStorage.setItem("coin", event.target.value);
    localStorage.setItem("isMin", "false");
    localStorage.setItem("check", "false");
    setChecked(event.target.checked);
    console.log(event);
  };
  const label = { inputProps: { "aria-label": "Start Mining" } };

  const onClick = (id) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`http://localhost:5000/users/notification/${id}`, {
        headers: headers,
      })
      .then((res) => {
        for (let i = 0; i < notification.length; i++) {
          if (notification[i]._id === id) {
            notification[i].isSeen = true;
          }
        }
        console.log(notification);
        toast.success("Notification has been marked as read");
      })
      .catch((err) => {
        toast.error("sorry something went wrong");
      });
    fetch();
  };

  const fetch = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .get("http://localhost:5000/users/notificationGet", {
        headers: headers,
      })
      .then((res) => {
        setNotification(res.data.notif.reverse());
        for (let i = 0; i < notification.length; i++) {
          if (notification[i].isSeen === false) {
            setRead(true);
          }
        }
      })
      .catch((err) => {
        toast.error("cannot load notifications");
      });

    localStorage.setItem("notification", parseInt(notification.length));
    console.log(notification.length);
    console.log(localStorage.getItem("notification"));
  };

  let not = localStorage.getItem("notification");
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              {/* <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: lightColor,
                  "&:hover": {
                    color: "common.white",
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to docs
              </Link> */}
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <div style={{ position: "relative" }}>
                  <IconButton color="inherit">
                    <NotificationsIcon onClick={handleClick} />
                  </IconButton>
                  {read && (
                    <div
                      style={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "0",
                        right: "-20",
                        marginTop: "7px",
                        marginLeft: "7px",
                      }}
                    ></div>
                  )}
                </div>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="menu-dropdown"
                style={{ width: "600px" }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div className="notify-head">
                  <p>Notifications</p>
                  {/* <button onClick={updateAll}>Mark all as read</button> */}
                </div>
                {notification.map((item) => {
                  return item.isSeen === false ? (
                    <div className="notify-menu" key={item._id}>
                      <MenuItem onClick={() => onClick(item._id)}>
                        <MessageIcon className="notify-icon" />
                        <p className="notify-text">{item.message}</p>
                      </MenuItem>
                    </div>
                  ) : (
                    <MenuItem key={item._id} onClick={() => onClick(item._id)}>
                      <MessageIcon className="notify-icon" />
                      <p className="notify-text">{item.message}</p>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                {localStorage.getItem("name")}
                <span style={{ width: "10px" }}></span>
                <Avatar alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {location.pathname === "/"
                  ? "Home"
                  : location.pathname.substring(1).charAt(0).toUpperCase() +
                    location.pathname.substring(1).slice(1)}
              </Typography>
            </Grid>
            <Grid item>
              <Box
                style={{ width: "100px", margin: "auto", marginRight: "100px" }}
              >
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    style={{ color: "white" }}
                  >
                    Select Coin
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={coin}
                    onChange={changeCoin}
                    style={{ width: "150px", color: "white" }}
                    label="coin"
                  >
                    <MenuItem value="BTC">BTC</MenuItem>
                    <MenuItem value="ETH">ETH</MenuItem>
                    <MenuItem value="LTC">LTC</MenuItem>
                    <MenuItem value="BNB">BNB</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item>
              <Tooltip
                title={
                  checked
                    ? "Stop Mining" + " " + localStorage.getItem("coin")
                    : "Start Mining" + " " + localStorage.getItem("coin")
                }
              >
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  {...label}
                  color="default"
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        {location.pathname === "/" && (
          <Tabs value={location.pathname === "/" ? 0 : 1} textColor="inherit">
            <Tab
              label="OVERVIEW"
              onClick={() => [setValue(0), history.push("/")]}
            />
            <Tab
              label="TRANSACTION HISTORY"
              onClick={() => [setValue(1), history.push("history")]}
            />
          </Tabs>
        )}
        {location.pathname === "/history" && (
          <Tabs value={location.pathname === "/" ? 0 : 1} textColor="inherit">
            <Tab
              label="OVERVIEW"
              onClick={() => [setValue(0), history.push("/")]}
            />
            <Tab
              label="TRANSACTION HISTORY"
              onClick={() => [setValue(1), history.push("history")]}
            />
          </Tabs>
        )}
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
