import { createTheme } from "@mui/material/styles";
import PretendardRegular from "./Pretendard-Medium.ttf";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard",
  },
  overrides: {
    "@font-face": [
      {
        fontFamily: "Pretendard",
        src: `url(${PretendardRegular})`,
      },
    ],
  },
  palette: {
    primary: {
      main: "#558BCF", // 원하는 색상 코드를 여기에 입력합니다.
    },
  },
});

export default theme;