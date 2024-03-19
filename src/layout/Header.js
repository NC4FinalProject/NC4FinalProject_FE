
import { drawerWidth } from "./MainLayout";

// icons
import { RiMenu3Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";

// components
import LanguageSelector from "../components/Header/SelectLanguage";
import Notifications from "../components/Header/Notifications";
import UserMenu from "../components/Header/UserMenu";

import { useState } from "react";

import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(5px)",
  backgroundColor: "rgba(255, 255, 255, 0.72)",
  color: "#333333",
  // [theme.breakpoints.up("sm")]: {
  //   // width: `calc(100% - ${drawerWidth}px)`,
  //   width: `calc(100%)`,
  //   flexShrink: 0,
  // },
  
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  // display: "flex",
  justifyContent: "space-between",
  // justifyContent: "center",
  // alignContent: "flex-start",
  // alignItems: "center",
}));

const ContainerStyle = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.5),
  gridAutoFlow: "column",
}));

const ToggleButtonStyle = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Header = (props) => {
  const [showLang, setShowLang] = useState(null);
  const [showNotification, setShowNotification] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(null);

  // open and close lang menu
  const handleOpenLang = (e) => setShowLang(e.currentTarget);
  const handleCloseLang = () => setShowLang(null);

  // notifications
  const handleOpenNotification = (e) => setShowNotification(e.currentTarget);
  const handleCloseNotification = () => setShowNotification(null);

  // User Menu
  const handleOpenUserMenu = (e) => setShowUserMenu(e.currentTarget);
  const handleCloseUserMenu = () => setShowUserMenu(null);

  return (
    <AppBarStyle position="fixed" >
      <ToolbarStyle >
        {/* Left side's items */}
        <ContainerStyle>
          {/* <ToggleButtonStyle 
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.onClick}
          >
            <RiMenu3Line />
          </ToggleButtonStyle> */}

          <IconButton aria-label="search">
            <BiSearch fontSize="small" />
          </IconButton>
          
        </ContainerStyle>
        <ContainerStyle>
          <Button color="inherit" component={Link} to="/listpage">ListPage</Button>
          <Button color="inherit" component={Link} to="/detailpage">DetailPage</Button>
          <Button color="inherit" component={Link} to="/insertpage">InsertPage</Button>
        </ContainerStyle>

        

        {/* Right side's items */}
        <ContainerStyle>
          {/* Language selector */}
          <LanguageSelector
            anchorEl={showLang}
            onOpen={handleOpenLang}
            onClose={handleCloseLang}
          />

          {/* Notification */}
          <Notifications
            anchorEl={showNotification}
            onOpen={handleOpenNotification}
            onClose={handleCloseNotification}
          />

          {/* User Avatar */}
          <UserMenu
            anchorEl={showUserMenu}
            onOpen={handleOpenUserMenu}
            onClose={handleCloseUserMenu}
          />
        </ContainerStyle>
      </ToolbarStyle>
    </AppBarStyle>
  );
};

export default Header;
