import React, { useEffect } from "react";
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

function createData(name, email, wallet, packageName, passkey, _id) {
  return { name, email, wallet, packageName, passkey, _id };
}

const rows = [
  createData(
    "fussion baba",
    "fussion@yahoo.com",
    6.0,
    "Baby",
    "5272twywg",
    "151615171"
  ),
  createData(
    "alex akubo",
    "alex@yahoo.com",
    6.0,
    "Baby",
    "5272twywg",
    "151615171"
  ),
  createData(
    "kosi wire wire",
    "kosi@yahoo.com",
    6.0,
    "Baby",
    "5272twywg",
    "151615171"
  ),
  createData(
    "ceser belongs",
    "ceser@yahoo.com",
    6.0,
    "Baby",
    "5272twywg",
    "151615171"
  ),
  createData(
    "ceser belong",
    "ceser@yahoo.com",
    6.0,
    "Baby",
    "5272twywg",
    "151615171"
  ),
  createData(
    "ceser belonging",
    "ceser@yahoo.com",
    6.0,
    "Baby",
    "5272twywg",
    "151615171"
  ),
];

const NewUser = () => {
  const history = useHistory();

  const [age, setAge] = React.useState("");
  const [data, setData] = React.useState();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("transactions")));
    setData(JSON.parse(localStorage.getItem("transactions")));
  }, []);

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
          Transaction History
        </div>
        <div className="tables1">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">BTC</TableCell>
                  <TableCell align="right">Total BTC</TableCell>
                  <TableCell align="right">LTC</TableCell>
                  <TableCell align="right">Total LTC</TableCell>
                  <TableCell align="right">ETH</TableCell>
                  <TableCell align="right">Total ETH</TableCell>
                  <TableCell align="right">BNB</TableCell>
                  <TableCell align="right">Total BNB</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">Today</TableCell>
                  <TableCell align="right">
                    {localStorage.getItem("BTCprice")}
                  </TableCell>
                  <TableCell align="right">
                    {localStorage.getItem("TotalBtc")}
                  </TableCell>
                  <TableCell align="right">
                    {localStorage.getItem("LTCprice")}
                  </TableCell>
                  <TableCell align="right">
                    {localStorage.getItem("TotalLtc")}
                  </TableCell>
                  <TableCell align="right">
                    {localStorage.getItem("ETHprice")}
                  </TableCell>
                  <TableCell align="right">
                    {localStorage.getItem("TotalEth")}
                  </TableCell>
                  <TableCell align="right">
                    {localStorage.getItem("BNBprice")}
                  </TableCell>
                  <TableCell align="right">
                    {localStorage.getItem("TotalBnb")}
                  </TableCell>
                </TableRow>
                {data &&
                  data.map((row) => (
                    <TableRow
                      key={row.date}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell align="right">{row.BTC}</TableCell>
                      <TableCell align="right">{row.totalBTC}</TableCell>
                      <TableCell align="right">{row.LTC}</TableCell>
                      <TableCell align="right">{row.totalLTC}</TableCell>
                      <TableCell align="right">{row.ETH}</TableCell>
                      <TableCell align="right">{row.totalETH}</TableCell>
                      <TableCell align="right">{row.BNB}</TableCell>
                      <TableCell align="right">{row.totalBNB}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!data && (
            <div
              style={{ width: "100%", marginTop: "30px", textAlign: "center" }}
            >
              No record yet
            </div>
          )}
        </div>
      </Card>
    </SideBar>
  );
};

export default NewUser;
