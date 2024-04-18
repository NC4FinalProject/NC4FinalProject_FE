import { React, useContext, useEffect, useState} from 'react'
import { Box, Button, IconButton, Paper,Table, TableBody,MenuItem, TableRow, TableCell,Grid,TableContainer,TextField,Dialog, Select,DialogTitle, DialogContent, DialogActions,Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CoTypography from '../../components/atoms/common/CoTypography';
import { MenuContext } from './MenuContext';
import AdminStore from '../../stores/AdminStore';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import axios from 'axios';
import Reportdialog from '../../components/organisms/review/Reportdialog';
import CoSelect from '../../components/organisms/common/CoSelect';
import MemberStore from "../../stores/MemberStore";

const AdminUserDetail = () => {

    const {point,handleSavePoint, reason,MemberInfo, setPoint,setReason, userDetail,pointSum,
        userChangeRole,  Memo,setMemo, pwValidation, pwChk, setPwValidation, setPwChk, userPw,
        userPwChk, setUserPw, setUserPwChk, setSelectedRole,qnaUserCount,contentsCount,inqueryCount, reviewCount} = AdminStore();
    const { memberInfo } = MemberStore();
    const maxChars = 150;
    const {userId} = useParams();
    const [open, setOpen] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [openrole, setOpenRole] = useState(false);
    const [openPointDialog, setOpenPointDialog] = useState(false);

    const handleRoleChange = (event) => {
      setSelectedRole(event.target.value);
  };
  const handleSaveRole = (userId ) => {
    userChangeRole(userId);
    setOpenRole(false);
  };

    const handlePointDialogOpen = () => {
      setOpenPointDialog(true);
    };

    const handlePointDialogClose = () => {
      setOpenPointDialog(false);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handlePointChange = (event) => {
        setPoint(event.target.value);
    };

    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const reportReasons = [
      "1일",
      "3일",
      "5일",
      "기타",
      "해지하기"
    ];

    useEffect(() => {
        const fetchUserDetail = async () => {
            await userDetail(userId);
            setSelectedValue(MemberInfo.role);
            console.log(selectedValue);
        };

        fetchUserDetail();
    }, [userDetail, userId, MemberInfo.role]);


    const OpenBlacklist = () => {
      setOpenReport(true);
    };

    const handleDialogClose = () => {
      setOpen(false);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
    
      if (name === 'userPw') {
        setUserPw(value);
      } else if (name === 'userPwChk') {
        setUserPwChk(value); 
      }
    
      if (name === 'userPw') { 
        if (value === userPwChk) {
          setPwChk(true);
          document.querySelector("#password-check-success").style.display = 'block';
          document.querySelector("#password-check-fail").style.display = 'none';
        } else {
          setPwChk(false);
          document.querySelector("#password-check-success").style.display = 'none';
          document.querySelector("#password-check-fail").style.display = 'block';
        }
      }
    
      if (name === 'userPwChk') {
        if (value === userPw) {
          setPwChk(true);
          document.querySelector("#password-check-success").style.display = 'block';
          document.querySelector("#password-check-fail").style.display = 'none';
        } else {
          setPwChk(false);
          document.querySelector("#password-check-success").style.display = 'none';
          document.querySelector("#password-check-fail").style.display = 'block';
        }
      }
    };


    const validatePassword = (userPw) => {
      return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{9,}$/.test(userPw);
    };
  
    const handleUserPwBlur = (e) => {
      if (validatePassword(e.target.value)) {
        setPwValidation(true);
        document.querySelector("#password-validation").style.display = "none";
          return;
      } else {
        setPwValidation(false);
        document.querySelector("#password-validation").style.display = "block";
          document.querySelector("#userPw").focus();
          return;
      }
    };
    const handleSaveMemo = async (userId) => {
      try {
        const memoData = {
          memo: Memo, 
          memberId: userId
        };
        await axios.post(`http://${process.env.REACT_APP_BACK_URL}/admin/user/memo`,
          memoData, 
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
          }
        );
        alert('메모가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.log('에러:', error);
    }
  };
  
    const handleJoin = useCallback((e) => {
      e.preventDefault();
  
      if (!pwValidation) {
        alert("비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.");
        document.querySelector("#userPw").focus();
        return;
      }
      if (!pwChk) {
        alert("비밀번호가 일치하지 않습니다.");
        document.querySelector("#userPwChk").focus();
        return;
      }
      
      const response =  axios.post(`http://${process.env.REACT_APP_BACK_URL}/admin/user/${userId}`, {
        password: userPw,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
        },
      }).then((response) => {
        console.log('비밀번호 변경이 성공적으로 처리되었습니다.');
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setOpen(false);
      }).catch((error) => {
        console.error('비밀번호 변경 중 오류가 발생했습니다:', error);
        alert('비밀번호 변경 중 오류가 발생했습니다.');
        setOpen(false);
      });
    }, [ pwValidation, pwChk, userId]);

  
    const handleMemoChange = (event) => {
      if (event.target.value.length <= maxChars) {
        setMemo(event.target.value);
      }
    };
  
    const onSubmit = ( detailReason, selectedValue) => {
      console.log("detailReason: ", detailReason);
      console.log("selectedValue: ", selectedValue);
      console.log("User ID: ", userId);
    };
      
  const { toggleMenu } = useContext(MenuContext);

  return (
    <div>
       <Box sx={{display:'flex', alignItems:'center', marginTop:'1.625rem',marginBottom:'1rem'}}>
        <IconButton onClick={toggleMenu}>
              <MenuIcon />
          </IconButton>
          <CoTypography size="MainTitle">사용자 조회</CoTypography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
      <Paper sx={{ width: '100%', height:'auto' }}>
      <Table>
        <TableBody>
            <TableRow>
            <TableCell colSpan={2}><CoTypography size="MainTitle">유저 정보</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell><CoTypography size="AdminUser">회원 유형</CoTypography></TableCell>
            <TableCell sx={{display:'flex'}}><CoTypography size="HoverText">{MemberInfo.role}</CoTypography>
            <Button sx={{ padding: '0', marginLeft:'1rem' }} onClick={() => setOpenRole(true)}>
                        <CoTypography size="HoverText">권한 변경</CoTypography>
            </Button>
            </TableCell>
              <Dialog open={openrole} onClose={() => setOpenRole(false)}>
                  <DialogTitle>권한 변경</DialogTitle>
                  <DialogContent sx={{ minWidth: '32.75rem' }}>
                      <Select
                          value={selectedValue}
                          onChange={handleRoleChange}
                          fullWidth
                      >
                          <MenuItem value="ADMIN">관리자</MenuItem>
                          <MenuItem value="USER">수강생</MenuItem>
                          <MenuItem value="TEACHER">강사</MenuItem>
                          <MenuItem value="PRETEACHER">강사 신청중</MenuItem>
                          <MenuItem value="BLACKLIST">블랙리스트 회원</MenuItem>
                          <MenuItem value="RESIGNED">탈퇴 회원</MenuItem>
                      </Select>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={() => setOpenRole(false)}>취소</Button>
                      <Button onClick={() => handleSaveRole(userId)} color="primary">저장</Button>
                  </DialogActions>
              </Dialog>
            </TableRow>
            <TableRow>
            <TableCell><CoTypography size="AdminUser">아이디</CoTypography></TableCell>
            <TableCell><CoTypography size="HoverText">{MemberInfo.username}</CoTypography></TableCell>

            </TableRow>
            <TableRow>
            <TableCell><CoTypography size="AdminUser">비밀번호</CoTypography></TableCell>
            <TableCell><Button sx={{padding:'0'}}  onClick={() => setOpen(true)}>
              <CoTypography size="HoverText">비밀번호 변경</CoTypography></Button></TableCell>
            <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>비밀번호 변경</DialogTitle>
        <DialogContent sx={{minWidth:'32.75rem'}}>
          <TextField
            autoFocus
            margin="dense"
            id="userPw"
            name="userPw"
            label="새로운 비밀번호"
            type="password"
            fullWidth
            value={userPw}
            onChange={handleInputChange}
            onBlur={handleUserPwBlur}
          />
          <Typography
             name='password-validation'
             id='password-validation'
             component='p'
             variant='string'
             style={{display: 'none', color: 'red', fontSize:'0.725rem'}}>
             비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.
          </Typography>
          <TextField
            margin="dense"
            id="userPwChk"
            name="userPwChk"
            label="비밀번호 확인"
            type="password"
            fullWidth
            value={userPwChk}
            onChange={handleInputChange}
          />
           <Typography
               name='password-check-success'
               id='password-check-success'
               component='p'
               variant='string'
               style={{display: 'none', color: 'green', fontSize:'0.725rem'}}>
               비밀번호가 일치합니다.
           </Typography>
           <Typography
               name='password-check-fail'
               id='password-check-fail'
               component='p'
               variant='string'
               style={{display: 'none', color: 'red', fontSize:'0.725rem'}}>
               비밀번호가 일치하지 않습니다.
           </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>취소</Button>
          <Button onClick={handleJoin} color="primary">변경하기</Button>
        </DialogActions>
      </Dialog>
            </TableRow>
            <TableRow>
            <TableCell><CoTypography size="AdminUser">닉네임</CoTypography></TableCell>
            <TableCell><CoTypography size="HoverText">{MemberInfo.userNickname}</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell><CoTypography size="AdminUser">게시글</CoTypography></TableCell>
            <TableCell><CoTypography size="HoverText">게시글 {contentsCount} / 질의응답 {inqueryCount} / 강의 평가 {reviewCount} / 문의 {qnaUserCount}</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell><CoTypography size="AdminUser">블랙리스트</CoTypography></TableCell>
            <TableCell>
            <Button sx={{padding:'0'}} onClick={OpenBlacklist}>
               <CoTypography size="HoverText">블랙리스트 추가 / 변경</CoTypography>
                </Button>
              </TableCell>
              <Reportdialog open={openReport} handleClickClose={() => setOpenReport(false)}
                author={MemberInfo.userNickname} date={new Date().toLocaleDateString()}
                Title="블랙리스트 추가 / 변경"
                onSubmit={(detailReason) => onSubmit(detailReason, selectedValue)}
                selectComponent={
                  <Box sx={{ margin: "0.5rem auto 0", maxWidth: "27rem" }}>
                  <CoSelect onChange={handleSelectChange} value={selectedValue} options={reportReasons} />
                  </Box>
                }>
                1. 정지 사유도 함께 적어주세요.
              </Reportdialog>
             </TableRow>
         </TableBody>
        </Table>
      </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
      <Paper sx={{ width: '100%', height: 'auto', boxSizing: 'border-box'}}>
        <Box sx={{borderBottom: '1px solid rgb(224, 224, 224, 1)'}}>
        <CoTypography size="MainTitle" sx={{paddingLeft:'1rem', paddingTop:'1rem', paddingBottom:'1rem'}}>결제 내역 및 포인트</CoTypography>
        </Box>
        <Box sx={{display:'flex', alignItems:'center', paddingTop:'0.635rem',paddingBottom:'0.635rem',borderBottom: '1px solid rgb(224, 224, 224, 1)'}}>
        <CoTypography size="AdminUser" sx={{paddingLeft:'1rem'}}> 보유 포인트 </CoTypography>
        <CoTypography size="HoverText" sx={{paddingLeft:'3rem'}}>{pointSum}P</CoTypography>
        <Button sx={{padding:'0.325rem', paddingLeft:'0', paddingRight:'0', marginLeft:'2.525rem'}}>
           <Button onClick={handlePointDialogOpen}><CoTypography size="HoverText">포인트 추가 / 차감</CoTypography></Button>
        </Button>
        </Box>
        <Table>
        <TableBody>
            <TableRow>
            <TableCell sx={{width:'25%'}}><CoTypography size="AdminUser">일자</CoTypography></TableCell>
            <TableCell sx={{width:'45%', paddingLeft:'0.8125rem'}}><CoTypography size="AdminUser">사유</CoTypography></TableCell>
            <TableCell sx={{width:'30%'}} align='right'>
                <CoTypography size="AdminUser">
                   포인트 추가 / 차감
                </CoTypography>
            </TableCell>
            <Dialog open={openPointDialog} onClose={handlePointDialogClose}>
            <DialogTitle>포인트 추가 / 차감</DialogTitle>
                <div style={{ padding: '20px', paddingTop:'0' }}>
                  <TextField
                      type="number"
                      label="포인트"
                      value={point}
                      onChange={handlePointChange}
                      fullWidth
                      margin="normal"
                  />
                    <TextField
                        label="사유"
                        value={reason}
                        onChange={handleReasonChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="날짜"
                        value={new Date().toLocaleDateString()}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <Button onClick={() => handleSavePoint(userId)} style={{float:'right' }}>저장</Button>
                    <Button onClick={handlePointDialogClose} style={{float:'right'}}>취소</Button>
                </div>
            </Dialog>
            </TableRow>
        </TableBody>
        </Table>
        <TableContainer style={{ maxHeight: '14.275rem' }} sx={{
            '&::-webkit-scrollbar': {
                width: '0.625rem',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#558BCF',
                borderRadius: '10px',
            }}}>
        <Table>
        <TableBody>
          {MemberInfo.pointDTOList && MemberInfo.pointDTOList.map((point, index) => (
            <TableRow key={index}>
            <TableCell sx={{width:'25%'}}><CoTypography size="AdminUser">{point.createdAt}</CoTypography></TableCell>
            <TableCell sx={{width:'45%'}}><CoTypography size="AdminUser">{point.reason}</CoTypography></TableCell>
            <TableCell sx={{width:'30%'}} align='right'><CoTypography size="AdminUser">{point.value}P</CoTypography></TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
      </Paper>   
        </Grid>
        </Grid>
        <Grid container spacing={2} sx={{paddingTop:'1rem'}}>
        <Grid item xs={12} md={4}>
      <Paper sx={{ width: '100%', height:'auto' }}>
      <Box sx={{borderBottom: '1px solid rgb(224, 224, 224, 1)'}}>
        <CoTypography size="MainTitle" sx={{paddingLeft:'1rem', paddingTop:'1rem', paddingBottom:'1rem'}}>메모</CoTypography>
      </Box>
      <Box sx={{padding:'1rem'}}>
        <TextField
          value={Memo}
          onChange={handleMemoChange}
          multiline
          maxRows={8}
          fullWidth
          variant="outlined"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button onClick={() => handleSaveMemo(userId)}><CoTypography size="HoverText">등록하기</CoTypography></Button>
            <CoTypography size="AdminUser">{`${Memo ? Memo.length : '0'}/${maxChars}`}</CoTypography>
        </Box>
      </Box>
        </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
        <Paper sx={{ width: '100%', height: 'auto', boxSizing: 'border-box'}}>
         <Box sx={{borderBottom: '1px solid rgb(224, 224, 224, 1)'}}>
          <CoTypography size="MainTitle" sx={{paddingLeft:'1rem', paddingTop:'1rem', paddingBottom:'1rem'}}>신고 내역</CoTypography>
         </Box>
         <Table>
            <TableBody>
                <TableRow>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">일자</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">신고자</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">신고 대상</CoTypography></TableCell>
                <TableCell sx={{width:'40%'}}><CoTypography size="AdminUser">신고 사유</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}} align='right'><CoTypography size="AdminUser">처리 상태</CoTypography></TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <TableContainer style={{ maxHeight: '14.275rem' }} sx={{
            '&::-webkit-scrollbar': {
                width: '0.625rem',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#558BCF',
                borderRadius: '10px',
            }}}>
        <Table>
            <TableBody>
                <TableRow>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">2024/04/07</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">지에스</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">미래개발</CoTypography></TableCell>
                <TableCell sx={{width:'40%'}}><CoTypography size="AdminUser">게시물 도배</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}} align='right'><CoTypography size="AdminUser">미처리</CoTypography></TableCell>
                </TableRow>
                <TableRow>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">2024/04/06</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">동그라미</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">미래개발</CoTypography></TableCell>
                <TableCell sx={{width:'40%'}}><CoTypography size="AdminUser">블로그 홍보</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}} align='right'><CoTypography size="AdminUser">미처리</CoTypography></TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        </Paper>
        </Grid>
        </Grid>
    </div>
  )
}

export default AdminUserDetail;
