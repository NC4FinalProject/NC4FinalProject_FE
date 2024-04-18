import { useState, React, useCallback } from 'react';
import Box from '@mui/material/Box';
import '../../../scss/Header.scss';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import CoHoverButton from '../../atoms/common/CoHoverButton';
import MemberStore from "../../../stores/MemberStore";
import Hidden from '@mui/material/Hidden';
import Avatar from '@mui/material/Avatar';
import { useContentsListStore } from "../../../stores/ContentsStore";

const Header = () => {
    const navi = useNavigate();
    const isLogin = sessionStorage.getItem("ACCESS_TOKEN") ? true : false;
    const {memberInfo, setMemberInfo} = MemberStore((state) => state);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const handleProfileClick = () => {
      setProfileMenuOpen(!isProfileMenuOpen);
  };

  const location = useLocation();

  const {serachKeyword, setSearchKeyword, getContentsListOutput} = useContentsListStore();

    const handleLogout = () => {
        const response = axios
            .get(`http://${process.env.REACT_APP_BACK_URL}/member/logout`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                },
            })
            .then((response) => {
                if (response.data.item && response.data.statusCode === 200) {
                    setMemberInfo(null);
                    sessionStorage.removeItem("ACCESS_TOKEN");
                    window.alert("로그아웃 성공.");
                    navi("/login");
                } else {
                    window.alert("로그아웃 실패.");
                }
            });
    };

    const handleSearch = useCallback(() => {
      if(location) {
        if(location.pathname != '/list') {
          navi("/list");
        } else {
          getContentsListOutput();
        }
      }
    }, [location]);

    const handleKeydown = (e) => {
      if(e.keyCode === 13) {
        handleSearch();
      }
    }

    return (
    <Box display="flex" sx={{ marginTop: "1rem", width:'100%'  }}>
      <Hidden lgDown>
      <img
        src="/images/team_logo.png"
        alt="team_logo"
        height="30rem"
        width="150rem"
        style={{ paddingTop: "0.125rem", cursor: "pointer" }}
        onClick={() => navi("/")}
      />
      </Hidden>
      <Hidden lgUp>
      <img
        src="/images/favicon.ico"
        alt="team_logo"
        height="30rem"
        width="30rem"
        style={{ paddingTop: "0.125rem", cursor: "pointer" }}
        onClick={() => navi("/")}
      />
      </Hidden>
      <Box sx={{width:'10%', textAlign:'-webkit-center'}}>
      <CoHoverButton
        style={{ marginLeft: "0.3rem" }}
        onClick={() => navi("/list")}
      >
        강의
      </CoHoverButton>
      </Box>
      <Box sx={{width:'100%', display:'flex'}}>
      <TextField
        sx={{
          marginLeft: "1.8rem",
          width: "100%",
          "& .MuiInputBase-input": {
            height: "1rem",
            padding: "10px",
            "&::placeholder": {
              textAlign: "center",

            },
          },
        }}
        value={serachKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeydown}
        placeholder="검색어를 입력해주세요."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{cursor: "pointer"}} onclick={handleSearch}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{width:'30%', display:'flex'}}>
      {isLogin ? (
        <>
        <Hidden lgDown>
          <CoHoverButton
            onClick={handleLogout}
            style={{ marginLeft: "2rem", maxHeight: "2.3rem" }}
          >
            로그아웃
          </CoHoverButton>
          <CoHoverButton
            onClick={() => navi("/mypage")}
            style={{ marginLeft: "2rem", maxHeight: "2.3rem" }}
          >
            마이페이지
          </CoHoverButton>
        </Hidden>
        <Hidden lgUp>
          <div onClick={handleProfileClick}>
                {memberInfo.profileFile === null ? (
                <Avatar src="/broken-mage.jpg" style={{width: '2.25rem', height: '2.25rem', marginLeft:'1.5rem'}}/> 
                  ) : (
                      <img src={`https://kr.object.ncloudstorage.com/envdev/` + memberInfo.profileFile} alt='thumbnail' style={{width: '2.25rem', height: '2.25rem', marginTop:'0.825rem', marginLeft:'1rem', borderRadius:'70%'}}/>
                    )}
          </div>
          {isProfileMenuOpen && (
              <Box style={{ position: 'absolute', top: '3rem', right: 0, backgroundColor: '#fff', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', padding: '0.5rem', display:'grid' }}>
                   <CoHoverButton
                    onClick={handleLogout}
                    style={{maxHeight: "2.3rem" }}
                  >
                    로그아웃
                  </CoHoverButton>
                  <CoHoverButton
                  onClick={() => navi("/mypage")}
                  style={{maxHeight: "2.3rem" }}
                >
                  마이페이지
                </CoHoverButton>
              </Box>
          )}
      </Hidden>
      </>
      ) : (
        <>
          <CoHoverButton
            onClick={() => navi("/login")}
            style={{ marginLeft: "2rem", maxHeight: "2.3rem" }}
          >
            로그인
          </CoHoverButton>
          <Hidden lgDown>
          <CoHoverButton
            onClick={() => navi("/join")}
            style={{ marginLeft: "2rem", maxHeight: "2.3rem"}}
          >
            회원가입
          </CoHoverButton>
          </Hidden>
        </>
      )}

      </Box>
    </Box>
    </Box>
  );
};

export default Header;