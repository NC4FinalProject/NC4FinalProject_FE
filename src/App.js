import React from "react";
import { Container, ThemeProvider } from "@mui/material";
import createTheme from "./components/atoms/common/CreateTheme";
import Home from "./pages/main/Home";
import { Routes, Route } from "react-router-dom";
import Join from "./pages/member/Join";
import Login from "./pages/member/Login";
import KakaoLogin from "./pages/member/KakaoLogin";
import GoogleLogin from "./pages/member/GoogleLogin";
import Mypage from "./pages/member/Mypage";
import List from "./pages/contents/List";
import Detail from "./pages/contents/Detail";
import Insert from "./pages/contents/Insert";
import ErrorPage from "./pages/main/ErrorPage";
import MainLayout from "./components/organisms/common/MainLayout";


function App() {
  return (
    <ThemeProvider theme={createTheme}>
      <Container maxWidth="sm" style={{ maxWidth: "1300px", padding: 0 }}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/join" element={<Join></Join>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              path="/kakao-login"
              element={<KakaoLogin></KakaoLogin>}
            ></Route>
            <Route
              path="/google-login"
              element={<GoogleLogin></GoogleLogin>}
            ></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
            <Route path="/listpage" element={<List></List>} />
            <Route path="/detailpage" element={<Detail></Detail>} />
            <Route path="/insertpage" element={<Insert></Insert>} />
            <Route path="/errorpage" element={<ErrorPage></ErrorPage>} />
            <Route path="/*" element={<ErrorPage></ErrorPage>} />
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
