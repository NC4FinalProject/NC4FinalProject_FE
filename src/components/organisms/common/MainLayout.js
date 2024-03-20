import styled from "@emotion/styled";
import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../organisms/common/Header";
import Footer from '../../organisms/common/Footer';

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  padding: theme.spacing(1),
}));

const MainLayout = (props) => {
  // window width
  const { window } = props;
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleDrawer = () => setToggleMenu(!toggleMenu);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Header/>
        <Outlet></Outlet>
      <Footer></Footer>
    </>

  );
};

export default MainLayout;

export const drawerWidth = 240;
