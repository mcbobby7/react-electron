import React, { useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import "../App.css";
import SideBar from "../components/base";
import axios from "axios";
import Content from "../components/content";
import Card from "../components/card";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
const NewUser = () => {
  const history = useHistory();

  const [age, setAge] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState("");
  const [withdraw, setWithdraw] = React.useState("");
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

  const [mode, setMode] = React.useState("user");
  const [rate, setRate] = React.useState();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getData = useCallback(() => {
    try {
      axios.get("https://calm-beyond-85832.herokuapp.com/users").then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.hasError === false) {
          setData(res.data.users.reverse());
          console.log(data);
        } else {
          toast.error(res.data.message);
        }
      });

      axios
        .get("https://calm-beyond-85832.herokuapp.com/users/getWithdarw")
        .then((res) => {
          // console.log(res);
          if (res.data.hasError === false) {
            setWithdraw(res.data.withdraw.reverse());
            console.log(withdraw);
          } else {
            toast.error(res.data.message);
          }
        });

      // axios.get("https://calm-beyond-85832.herokuapp.com/users/getRate").then((res) => {
      //   console.log(res);
      //   if (res.data.hasError === false) {
      //     setRate(res.data.rate[0]);
      //     console.log(res.data.rate[0]);
      //     setbtc(res.data.rate[0].btc);
      //     setltc(res.data.rate[0].ltc);
      //     setbnb(res.data.rate[0].bnb);
      //     seteth(res.data.rate[0].eth);

      //     setbtc1(res.data.rate[0].btc1);
      //     setltc1(res.data.rate[0].ltc1);
      //     setbnb1(res.data.rate[0].bnb1);
      //     seteth1(res.data.rate[0].eth1);

      //     setbtc2(res.data.rate[0].btc2);
      //     setltc2(res.data.rate[0].ltc2);
      //     setbnb2(res.data.rate[0].bnb2);
      //     seteth2(res.data.rate[0].eth2);

      //     setbtc3(res.data.rate[0].btc3);
      //     setltc3(res.data.rate[0].ltc3);
      //     setbnb3(res.data.rate[0].bnb3);
      //     seteth3(res.data.rate[0].eth3);
      //     console.log(rate);
      //   } else {
      //     toast.error(res.data.message);
      //   }
      // });
    } catch (error) {
      toast.error("Error loading data");
    }
  }, [data, withdraw]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      btc,
      ltc,
      eth,
      bnb,
      btc1,
      ltc1,
      eth1,
      bnb1,
      btc2,
      ltc2,
      eth2,
      bnb2,
      btc3,
      ltc3,
      eth3,
      bnb3,
    };
    console.log(data);
    axios
      .post("https://calm-beyond-85832.herokuapp.com/users/updateRate", data)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.hasError === false) {
          toast.success("Rate created successfully");
        } else {
          toast.error(res.data.message);
        }
      });
  };

  return (
    <SideBar>
      <Card className="about">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            style={{ margin: "30px", display: "flex", alignSelf: "center" }}
            variant="contained"
            onClick={() => setMode("user")}
          >
            View Users
          </Button>
          <Button
            style={{ margin: "30px", display: "flex", alignSelf: "center" }}
            variant="outlined"
            onClick={() => setMode("with")}
          >
            View Withdrawals
          </Button>

          {/* <Button
            style={{ margin: "30px", display: "flex", alignSelf: "center" }}
            variant="outlined"
            onClick={() => setMode("rate")}
          >
            Update Rate
          </Button> */}
        </div>
        <div
          style={{
            fontSize: "28px",
            marginBottom: "30px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          {mode === "user" ? "Users" : "Withdrawals"}
        </div>
        {mode === "user" && (
          <div style={{ width: "100%", margin: "auto", paddingTop: "30px" }}>
            {!loading ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">BTC</TableCell>
                      <TableCell align="right">LTC</TableCell>
                      <TableCell align="right">BNB</TableCell>
                      <TableCell align="right">ETH</TableCell>
                      <TableCell align="right">Package</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data.map((row) => (
                        <TableRow
                          style={{ cursor: "pointer" }}
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          onClick={() => history.push(`user/${row._id}`)}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.btc}</TableCell>
                          <TableCell align="right">{row.ltc}</TableCell>
                          <TableCell align="right">{row.bnb}</TableCell>
                          <TableCell align="right">{row.eth}</TableCell>
                          <TableCell align="right">{row.package}</TableCell>
                        </TableRow>
                      ))}
                    {loading && <div>Laoding</div>}
                  </TableBody>
                </Table>
              </TableContainer>
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
        )}

        {mode === "with" && (
          <div style={{ width: "100%", margin: "auto", paddingTop: "30px" }}>
            {!loading ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Mode</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {withdraw &&
                      withdraw.map((row) => (
                        <TableRow
                          style={{ cursor: "pointer" }}
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell scope="row">{row.name}</TableCell>
                          <TableCell align="right">{row.mode}</TableCell>
                          <TableCell align="right">{+row.amount}</TableCell>
                          <TableCell align="right">
                            {moment(row.createdAt).format("YYYY/MM/DD")}{" "}
                            <span style={{ color: "red" }}>
                              {moment(row.createdAt).format("hh:mm a")}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    {loading && <div>Laoding</div>}
                  </TableBody>
                </Table>
              </TableContainer>
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
        )}

        {/* {mode === "rate" && (
          <div style={{ width: "100%", margin: "auto", paddingTop: "30px" }}>
            {!loading ? (
              <div style={{ width: "70%", margin: "auto", paddingTop: "30px" }}>
                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                  Hatch
                </div>
                <Box style={{ width: "400px", margin: "auto" }}>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BTC
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={btc}
                      onChange={(e) => setbtc(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      LTC
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={ltc}
                      onChange={(e) => setltc(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BNB
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={bnb}
                      onChange={(e) => setbnb(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      ETH
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={eth}
                      onChange={(e) => seteth(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <div
                  style={{
                    textAlign: "center",
                    paddingBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  Baby
                </div>

                <Box style={{ width: "400px", margin: "auto" }}>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BTC
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={btc1}
                      onChange={(e) => setbtc1(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      LTC
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={ltc1}
                      onChange={(e) => setltc1(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BNB
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={bnb1}
                      onChange={(e) => setbnb1(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      ETH
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={eth1}
                      onChange={(e) => seteth1(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <div
                  style={{
                    textAlign: "center",
                    paddingBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  Adult
                </div>

                <Box style={{ width: "400px", margin: "auto" }}>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BTC
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={btc2}
                      onChange={(e) => setbtc2(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      LTC
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={ltc2}
                      onChange={(e) => setltc2(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BNB
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={bnb2}
                      onChange={(e) => setbnb2(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      ETH
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={eth2}
                      onChange={(e) => seteth2(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <div
                  style={{
                    textAlign: "center",
                    paddingBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  Aged
                </div>

                <Box style={{ width: "400px", margin: "auto" }}>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BTC
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={btc3}
                      onChange={(e) => setbtc3(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      LTC
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={ltc3}
                      onChange={(e) => setltc3(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      BNB
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={bnb3}
                      onChange={(e) => setbnb3(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box
                  style={{ width: "400px", margin: "auto", marginTop: "30px" }}
                >
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      ETH
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      style={{ width: "400px" }}
                      value={eth3}
                      onChange={(e) => seteth3(e.target.value)}
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
                    onClick={handleSubmit}
                    style={{
                      margin: "30px",
                      display: "flex",
                      alignSelf: "center",
                    }}
                    variant="contained"
                  >
                    {loading ? "Loading..." : "Create"}
                  </Button>
                </div>
              </div>
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
        )} */}
      </Card>
    </SideBar>
  );
};

export default NewUser;
