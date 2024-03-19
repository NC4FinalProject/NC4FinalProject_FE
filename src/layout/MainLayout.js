import styled from "@emotion/styled";
import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  padding: theme.spacing(1),
}));

const MainLayout = (props) => {
  // window width
  const { window } = props;
  const [toggleMenu, setToggleMenu] = useState(false);
//   const classes = useStyles();

  // toggle drawer
  const handleToggleDrawer = () => setToggleMenu(!toggleMenu);
//   const handleToggleClose = () => setToggleMenu(false);

  // I don't know the work of container yet
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <Header onClick={handleToggleDrawer} />

      {/* Drawer */}
      {/* <SideDrawer
        container={container}
        toggleMenu={toggleMenu}
        onClose={handleToggleClose}
        drawerPaper={classes.drawerPaper}
      /> */}

      {/* Content */}
      <MainStyle>
        <Toolbar />
        {/* Main parts */}
        <Outlet></Outlet>
      </MainStyle>

    </Box>
    <Footer></Footer>
    </>

  );
};

export default MainLayout;

export const drawerWidth = 240;
