// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import App from './App';
// import Join from './pages/Join';
// import Login from './pages/Login';
// import KakaoLogin from './pages/KakaoLogin';
// import GoogleLogin from './pages/GoogleLogin';
// import BoardTemplate from './pages/BoardTemplate';
// import Home from './pages/Home';

// import ListPage from './pages/ListPage';
// import DetailPage from './pages/DetailPage';
// import InsertPage from './pages/InsertPage';
// import ErrorPage from './pages/ErrorPage';

// import MainLayout from './layout/MainLayout';
// import { ThemeProvider } from '@mui/material';
// import theme from './theme';


// const AppRouter = () => {
//   return (
//     <ThemeProvider theme={theme}>
//         <Routes>
//             {/** "/" 요청이 오면 App 컴포넌트에서 boardTemplate을 띄워줄건데
//              *   로그인이 되어있지 않으면 로그인페이지로 이동하도록 설정
//               */}
//             <Route index element={<App></App>}></Route>
//             <Route path='/join' element={<Join></Join>}></Route>
//             <Route path='/login' element={<Login></Login>}></Route>
//             <Route path='/kakao-login' element={<KakaoLogin></KakaoLogin>}></Route>
//             <Route path='/google-login' element={<GoogleLogin></GoogleLogin>}></Route>
//             <Route path='/board' element={<BoardTemplate></BoardTemplate>}></Route>

//             <Route element={<MainLayout/>}>
//             <Route path="/" element={<Home></Home>} />

//                 <Route path="/listpage" element={<ListPage></ListPage>} />

//                 <Route path="/detailpage" element={<DetailPage></DetailPage>} />

//                 <Route path="/insertpage" element={<InsertPage></InsertPage>} />

//                 <Route path="/errorpage" element={<ErrorPage></ErrorPage>} />
//                 <Route path="/*" element={<ErrorPage></ErrorPage>} />
//             </Route>
//           </Routes>
//     </ThemeProvider>
//   );
// }

// export default AppRouter;