import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif",
  },
  palette: {
    primary: {
      main: "#558BCF", // 원하는 색상 코드를 여기에 입력합니다.
    },
    green: {
      main: "#8EC96D",
    },
    gray: {
      main: "#EBEBEB",
    },
  },
});

export default theme;
