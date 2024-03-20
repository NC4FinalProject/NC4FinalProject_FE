import React from 'react';
import { Container, ThemeProvider } from '@mui/material';
import createTheme from './components/atoms/common/CreateTheme';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join';
import Login from './pages/Login';
import KakaoLogin from './pages/KakaoLogin';
import GoogleLogin from './pages/GoogleLogin';
import BoardTemplate from './pages/BoardTemplate';
import Mypage from './pages/Mypage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import InsertPage from './pages/InsertPage';
import ErrorPage from './pages/ErrorPage';
import MainLayout from './layout/MainLayout';

function App() {
    return (
      <ThemeProvider theme={createTheme}>
        <Container maxWidth="sm" style={{maxWidth: '1300px', padding: 0}}>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/join' element={<Join></Join>}></Route>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='/kakao-login' element={<KakaoLogin></KakaoLogin>}></Route>
                    <Route path='/google-login' element={<GoogleLogin></GoogleLogin>}></Route>
                    <Route path='/mypage' element={<Mypage></Mypage>}></Route>
                    <Route path='/board' element={<BoardTemplate></BoardTemplate>}></Route>
                    <Route path="/listpage" element={<ListPage></ListPage>} />
                    <Route path="/detailpage" element={<DetailPage></DetailPage>} />
                    <Route path="/insertpage" element={<InsertPage></InsertPage>} />
                    <Route path="/errorpage" element={<ErrorPage></ErrorPage>} />
                    <Route path="/*" element={<ErrorPage></ErrorPage>} />
                </Route>
            </Routes>
        </Container>
      </ThemeProvider>
    );
  }

export default App;