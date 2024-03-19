import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { RiHome4Fill, RiUserFill, RiSettings3Fill } from "react-icons/ri";
import userAvatar from "../../images/avatar_default.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    maxWidth: 225,
    width: "90%",
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  padding: "10px 16px",
}));

const AvatarButtonStyle = styled(IconButton)(({ theme }) => ({
  padding: "2px 6px",
  "& .MuiAvatar-root": {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const LinkStyle = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  padding: theme.spacing(1),
  color: theme.palette.common.black,
  fontSize: theme.spacing(2.25),
  fontWeight: 500,
  border: "1px solid #333",
  borderRadius: theme.spacing(0.75),
  transition: "background 0.25s ease-in",
  "&:hover": {
    backgroundColor: theme.palette.gray.lighter,
    textDecoration: "none",
  },
}));

const MenuItemStyle = styled(MenuItem)(({ theme }) => ({
  padding: 0,
  "& a": {
    width: "100%",
    padding: "8px 20px",
    display: "flex",
    alignItems: "center",
    fontSize: 18,
    color: theme.palette.common.black,
    textDecoration: "none",
    "& svg": {
      marginRight: theme.spacing(1.5),
      fontSize: theme.spacing(2.5),
    },
  },
}));

const links = [
  { id: "l1", path: "/home", title: "Home", icon: <RiHome4Fill /> },
  { id: "l2", path: "/profile", title: "Profile", icon: <RiUserFill /> },
  { id: "l3", path: "/settings", title: "Settings", icon: <RiSettings3Fill /> },
];

const UserMenu = (props) => {
  return (
    <>
      <AvatarButtonStyle
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        <AccountCircleIcon style={{ fontSize: 30 }}/>
        {/* <Avatar/> */}
        {/* <Avatar src="https://e7.pngegg.com/pngimages/425/139/png-clipart-computer-icons-user-my-miscellaneous-account.png" alt="User Name" /> */}
      </AvatarButtonStyle>

      <StyledMenu
        id="userMenu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
      >
        <BoxStyle>
          <Typography variant="h6" component="h3">Jaydon Frankie</Typography>
          <Typography variant="body2" component="p" sx={{ color: 'palette.gray.main' }}>demo@minimal.cc</Typography>
        </BoxStyle>

        <Divider />

        {links.map((el) => (
          <MenuItemStyle key={el.id}>
            <Link to={el.path} style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
              {el.icon}
              <Box component="span" sx={{ ml: 2 }}>{el.title}</Box>
            </Link>
          </MenuItemStyle>
        ))}

        <BoxStyle>
          <LinkStyle to="/" underline="none">Logout</LinkStyle>
        </BoxStyle>
      </StyledMenu>
    </>
  );
};

export default UserMenu;
