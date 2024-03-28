import {Grid, Button} from '@mui/material';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <div className="footer">
      <Grid container spacing={3} justifyContent="space-between" sx={{marginTop:'0'}}>
        <Grid item>
          <Typography style={{fontSize:'0.875rem', fontFamily: 'Pretendard SemiBold'}}>고객센터</Typography>
          <Typography style={{fontSize:'0.875rem', marginTop:'0.725rem'}}>오전 9시 ~ 오후 6시 (주말, 공휴일 제외)</Typography>
          <Button variant="contained" style={{width: '70px', height: '30px',marginTop:'0.625rem', paddingLeft: 0, paddingRight: 0, backgroundColor: 'rgba(0,0,0,0.04)', color: 'black'}}>문의하기</Button>        </Grid>
        <Grid item>
          <Typography style={{fontSize:'0.875rem',  fontFamily: 'Pretendard SemiBold'}}>공지사항</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>전체 카테고리</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>자주 묻는 질문</Typography>
          <Typography style={{fontSize:'0.725rem', marginTop:'0.725rem'}}>지원기기 이용환경</Typography>
        </Grid>
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
      </Grid>
      <Grid item xs={12}>
        <Typography style={{fontSize:'0.725rem', width:'40.725rem', marginTop:'0.625rem'}}>
          NC4 FINAL 대표 손우성 / 서울특별시 강남구 819 3 삼오빌딩 5-8층 / 대표전화 : 1588-1588 / 이메일 : bitcamp@nc4.final
          사업자등록번호 : 293-23-58284 / 통신판매업신고 : 2024-서울강남-52525 / 클라우드 호스팅 : NaverCloud Web Services Korea NC4
          사업자 정보 자세히 보기 NC4는 통신판매중개자로서 중개하는 거래에 대하여 책임을 부담하지 않습니다.
        </Typography>
      </Grid>
    </div>
  );
};

export default Footer;