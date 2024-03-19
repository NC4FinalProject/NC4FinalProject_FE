import { Menu, MenuItem, IconButton, ListItemText } from "@mui/material";
import styled from "@emotion/styled";

// images
import EN_Flag from "../../images/ic_flag_en.svg";
import DE_Flag from "../../images/ic_flag_de.svg";
import FR_Flag from "../../images/ic_flag_fr.svg";
import KO_Flag from "../../images/ic_flag_ko.svg";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: 175,
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:active": {
    backgroundColor: theme.palette.green.light,
  },
  "& .MuiListItemText-primary": {
    marginLeft: theme.spacing(2.5),
    fontSize: theme.spacing(2.25),
  },
}));

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  padding: "12px 9px",
  "& img": {
    width: theme.spacing(3),
  },
}));

// Language list
const languages = [
  { src: KO_Flag, alt: "Korean" },
  { src: EN_Flag, alt: "English" },
  { src: DE_Flag, alt: "German" },
  { src: FR_Flag, alt: "French" }
];

const LanguageSelector = (props) => {
  return (
    <>
      <IconButtonStyle
        aria-controls="language-selector"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        <img src={KO_Flag} alt="Korean" />
      </IconButtonStyle>

      <StyledMenu
        id="customized menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
      >
        {languages.map((el) => (
          <StyledMenuItem key={el.alt} onClick={props.onClose}>
            <img src={el.src} alt={el.alt} />

            <ListItemText primary={el.alt} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default LanguageSelector;

