import {Grid, Button, Hidden, Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import QnaDialog from '../../organisms/mypage/Qna';
import MemberStore from '../../../stores/MemberStore';
import QnaSelect from './QnaSelect';
import MainStore from '../../../stores/MainStore';

const Footer = () => {
  const [hover, setHover] = useState(false);
  const [openQna, setOpenQna] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const navi = useNavigate();
  const {sendQna} = MainStore();
  const [userQna, setUserQna] = useState('');

  const handleQnaSubmit = (detailReason) => {
    onSubmit(detailReason, selectedValue);
    sendQna(memberInfo,selectedValue, userQna);
    alert('문의가 정상적으로 완료되었습니다.')
  }
  const handleReasonChange = (event) => {
    setUserQna(event.target.value);
  };

  const OpenDialog = () => {
    if(memberInfo.userNickname === "") {
      alert("로그인 후 이용해주세요.")
      navi('/login')
      setOpenQna(false);
    } else {
    setOpenQna(true);
    }
};
const { memberInfo } = MemberStore();

const onSubmit = () => {
};

const handleSelectChange = (event) => {
  setSelectedValue(event.target.value);
};


const reportReasons = [
  "실시간 버그/서비스오류",
  "결제 / 지출증빙",
  "계정",
  "강의",
  "기타"
];

  return (
    <div className="footer">
      <Grid container spacing={3} justifyContent="space-between" sx={{marginTop:'0'}}>
        <Grid item>
          <Typography style={{fontSize:'0.875rem', fontFamily: 'Pretendard SemiBold'}}>고객센터</Typography>
          <Typography style={{fontSize:'0.875rem', marginTop:'0.725rem'}}>오전 9시 ~ 오후 6시 (주말, 공휴일 제외)</Typography>
          <Button variant="contained" onClick={OpenDialog} style={{width: '70px', height: '30px',marginTop:'0.625rem', paddingLeft: 0, paddingRight: 0, backgroundColor: '#558BCF', color: 'primary'}}>문의하기</Button>
          <QnaDialog  open={openQna} handleClickClose={() => setOpenQna(false)}
                author={memberInfo && memberInfo.userNickname ? memberInfo.userNickname : null}
                sx={{width:'100%'}}
                Title="1 대 1 문의"
                onSubmit={handleQnaSubmit}
                detailReason={userQna}
                handleReasonChange={handleReasonChange}
                selectComponent={
                  <Box sx={{ margin: "0.5rem auto 0"}}>
                  <QnaSelect onChange={handleSelectChange} value={selectedValue} options={reportReasons} sx={{width:'100%'}} />
                  </Box>  
                }       
                /> 
           </Grid>
        <Grid item>
        <Link 
          to="/noticelist" 
          style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Typography style={{fontSize:'0.875rem',  fontFamily: 'Pretendard SemiBold'}}>공지사항</Typography>
        </Link>         
         <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>전체 카테고리</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>자주 묻는 질문</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>지원기기 이용환경</Typography>
        </Grid>
        <Hidden smDown>
        <Grid item>
          <Typography style={{fontSize:'0.875rem',  fontFamily: 'Pretendard SemiBold'}}>크리에이터 센터</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>지식재산권 침해 신고 센터</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>국비지원</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>기업 고객문의</Typography>
        </Grid>
        <Grid item>
          <Typography style={{fontSize:'0.875rem',  fontFamily: 'Pretendard SemiBold'}}>개인정보 처리방침</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>이용약관</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>기프트카드 및 캐시 이용약관</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>환불정책</Typography>
        </Grid>
        <Grid item>
          <Typography style={{fontSize:'0.875rem',  fontFamily: 'Pretendard SemiBold'}}>사업자 정보 확인</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>제휴 및 대외협력</Typography>
        </Grid>
        </Hidden>
      </Grid>
      <Hidden smDown>
      <Grid item xs={12}>
        <Typography style={{fontSize:'0.725rem', width:'100%', marginTop:'0.625rem'}}>
          NC4 FINAL 대표 손우성 / 서울특별시 강남구 819 3 삼오빌딩 5-8층 / 대표전화 : 1588-1588 / 이메일 : bitcamp@nc4.final
          사업자등록번호 : 293-23-58284 / 통신판매업신고 : 2024-서울강남-52525 / 클라우드 호스팅 : NaverCloud Web Services Korea NC4
          사업자 정보 자세히 보기 NC4는 통신판매중개자로서 중개하는 거래에 대하여 책임을 부담하지 않습니다.
        </Typography>
      </Grid>
      </Hidden>
    </div>
  );
};

export default Footer;