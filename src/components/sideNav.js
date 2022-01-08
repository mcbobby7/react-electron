import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import { Link } from "react-router-dom";
import "../App.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./styles.css";
import DevicesIcon from "@mui/icons-material/Devices";
import PaymentsIcon from "@mui/icons-material/Payments";
import Logo from "../logo.PNG";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const history = useHistory();
  const location = useLocation();
  const categories = [
    {
      id: "Dashboard",
      children: [
        {
          id: "Dashboard",
          icon: <DashboardIcon />,
          link: "/",
          style: location.pathname === "/" ? "active" : "",
        },
        {
          id: "Devices",
          icon: <DevicesIcon />,
          link: "device",
          style: location.pathname === "/device" ? "active" : "",
        },

        {
          id: "Block",
          icon: <PaymentsIcon />,
          link: "blocks",
          style: location.pathname === "/blocks" ? "active" : "",
        },
        // {
        //   id: "Wallet",
        //   icon: <PeopleIcon />,
        //   link: "wallet",
        // },
        // {
        //   id: "Referrals",
        //   icon: <SettingsInputComponentIcon />,
        //   link: "about",
        // },
      ],
    },
    {
      id: "Settings",
      children: [
        {
          id: "Wallet",
          icon: <AccountBalanceWalletIcon />,
          link: "wallet",
          style: location.pathname === "/wallet" ? "active" : "",
        },
        {
          id: "Configurations",
          icon: <PermDataSettingIcon />,
          link: "configurations",
          style: location.pathname === "/configurations" ? "active" : "",
        },
        // {
        //   id: "Convert Coin",
        //   icon: <PermMediaOutlinedIcon />,
        //   link: "convert",
        // },
        {
          id: "Withrawal",
          icon: <CreditScoreIcon />,
          link: "withrawal",
          style: location.pathname === "/withrawal" ? "active" : "",
        },
      ],
    },
  ];
  const admin = [
    {
      id: "Admin",
      children: [
        {
          id: "New User",
          icon: <AccountCircleIcon />,
          link: "newUser",
          style: location.pathname === "/newUser" ? "active" : "",
        },
        {
          id: "All Users",
          icon: <SupervisedUserCircleIcon />,
          link: "allUsers",
          style: location.pathname === "/allUsers" ? "active" : "",
        },
      ],
    },
  ];
  const { ...other } = props;
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          <img
            style={{ width: "150px", marginTop: "20px" }}
            src={Logo}
            alt="logo"
          />
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Overview</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, link, style }) => (
              <Link exact style={{ textDecoration: "none" }} to={link}>
                <ListItem disablePadding key={childId}>
                  <ListItemButton selected={style} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
        {localStorage.getItem("isAdmin") === "true" &&
          admin.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: "#101F33" }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, active, link, style }) => (
                <Link exact style={{ textDecoration: "none" }} to={link}>
                  <ListItem disablePadding key={childId}>
                    <ListItemButton selected={style} sx={item}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}

              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem
            sx={{ py: 2, px: 3 }}
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/login")}
          >
            <ListItemIcon style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Logout
            </ListItemText>
          </ListItem>

          <Divider sx={{ mt: 2 }} />
        </Box>
      </List>
    </Drawer>
  );
}
