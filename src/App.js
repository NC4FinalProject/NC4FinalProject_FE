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
import JoinVerification from "./pages/member/JoinVerification";
import NoticeList from "./pages/contents/NoticeList";
import NoticeDetail from "./pages/contents/NoticeDetail";
import Cart from "./components/organisms/cart/Cart";
import AdminPage from "./pages/admin/AdminPage";
import AdminUser from "./pages/admin/AdminUser";
import AdminLayout from "./pages/admin/AdminLayout";

function App() {
  return (
    <ThemeProvider theme={createTheme}>
      <Container maxWidth="sm" style={{ maxWidth: "1300px", padding: 0 }}>
        <Routes>
          <Route element={<AdminPage />}>
            <Route path="/admin/main" element={<AdminLayout></AdminLayout>}></Route>
            <Route path="/admin/user" element={<AdminUser></AdminUser>}></Route>
          </Route>
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
            <Route
              path="/join-verification"
              element={<JoinVerification></JoinVerification>}
            />

            <Route
              path="/noticelist"
              element={<NoticeList></NoticeList>}
            ></Route>
            <Route
              path="/notice/:noticeId"
              element={<NoticeDetail></NoticeDetail>}
            ></Route>
            {/* /////////////////////////////////////////// */}
            <Route path="/list" element={<List></List>} />

            <Route path="/detail/:contentsId" element={<Detail></Detail>} />

            <Route path="/insert" element={<Insert></Insert>} />
            {/* /////////////////////////////////////////// */}

            <Route path="/error" element={<ErrorPage></ErrorPage>} />
            <Route path="/*" element={<ErrorPage></ErrorPage>} />
            <Route path="/cart" element={<Cart></Cart>}></Route>
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
