import { React, useContext, useEffect, useState} from 'react'
import { Box, Button, IconButton, Paper,Table, TableBody, TableRow, TableCell,Grid,TableContainer,TextField,Dialog, DialogTitle, DialogContent,DialogContentText, DialogActions } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CoTypography from '../../components/atoms/common/CoTypography';
import { MenuContext } from './MenuContext';
import AdminStore from '../../stores/AdminStore';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import axios from 'axios';
import Reportdialog from '../../components/organisms/review/Reportdialog';
import CoSelect from '../../components/organisms/common/CoSelect';

const AdminUserDetail = () => {

    const { userDetail, MemberInfo, Memo,setMemo,form, pwValidation, pwChk, setForm, setPwValidation, setPwChk } = AdminStore();
    const maxChars = 150;
    const {userId} = useParams();
    const [open, setOpen] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    const [selectedValue, setSelectedValue] = useState("");

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

    const sendReport = (userId, selectedValue) => {
      console.log(userId, selectedValue);
    };

    
    useEffect(() => {
      userDetail(userId);
    }, [userDetail, userId]);


    const OpenBlacklist = () => {
      setOpenReport(true);
    };
  
    const handleDialogOpen = () => {
      setOpen(true);
    };
  
    const handleDialogClose = () => {
      setOpen(false);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value
      });
  
      if (name === 'userPw') {
        if (value === form.userPwChk) {
          setPwChk(true);
        } else {
          setPwChk(false);
        }
      }
  
      if (name === 'userPwChk') {
        if (value === form.userPw) {
          setPwChk(true);
        } else {
          setPwChk(false);
        }
      }
    };
  
    const validatePassword = (userPw) => {
      return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{9,}$/.test(userPw);
    };
  
    const handleUserPwBlur = (e) => {
      if (validatePassword(e.target.value)) {
        setPwValidation(true);
      } else {
        setPwValidation(false);
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
  
      axios.post(`http://localhost:9090/admin/user/${userId}`, form, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
        },
      }).then((response) => {
        console.log('비밀번호 변경이 성공적으로 처리되었습니다.');
        // 추가적인 처리가 필요한 경우 여기에 작성합니다.
      }).catch((error) => {
        console.error('비밀번호 변경 중 오류가 발생했습니다:', error);
        // 오류 처리가 필요한 경우 여기에 작성합니다.
      });
    }, [form, pwValidation, pwChk, userId]);

  
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
            <TableCell><CoTypography size="HoverText">{MemberInfo.role}</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell><CoTypography size="AdminUser">아이디</CoTypography></TableCell>
            <TableCell><CoTypography size="HoverText">{MemberInfo.username}</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell><CoTypography size="AdminUser">비밀번호</CoTypography></TableCell>
            <TableCell><Button sx={{padding:'0'}}  onClick={() => setOpen(true)}><CoTypography size="HoverText">비밀번호 변경</CoTypography></Button></TableCell>
            <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>비밀번호 변경</DialogTitle>
        <DialogContent>
          <DialogContentText>
            새로운 비밀번호를 입력하세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="userPw"
            name="userPw"
            label="새로운 비밀번호"
            type="password"
            fullWidth
            value={form.userPw}
            onChange={handleInputChange}
            onBlur={handleUserPwBlur}
          />
          <TextField
            margin="dense"
            id="userPwChk"
            name="userPwChk"
            label="비밀번호 확인"
            type="password"
            fullWidth
            value={form.userPwChk}
            onChange={handleInputChange}
          />
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
            <TableCell><CoTypography size="HoverText">게시글 1 / 댓글 1 / 강의 평가 1 / 문의 3</CoTypography></TableCell>
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
        <CoTypography size="HoverText" sx={{paddingLeft:'3rem'}}>2300P</CoTypography>
        <Button sx={{padding:'0.325rem', paddingLeft:'0', paddingRight:'0', marginLeft:'2.525rem'}}>
           <CoTypography size="HoverText">포인트 추가 / 차감</CoTypography>
        </Button>
        </Box>
        <Table>
        <TableBody>
            <TableRow>
            <TableCell sx={{width:'25%'}}><CoTypography size="AdminUser">일자</CoTypography></TableCell>
            <TableCell sx={{width:'45%', paddingLeft:'0.8125rem'}}><CoTypography size="AdminUser">사유</CoTypography></TableCell>
            <TableCell sx={{width:'30%'}} align='right'><CoTypography size="AdminUser">포인트 지급 / 차감</CoTypography></TableCell>
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
            <TableCell sx={{width:'25%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
            <TableCell sx={{width:'45%'}}><CoTypography size="AdminUser">토스페이로 포인트 추가ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography></TableCell>
            <TableCell sx={{width:'30%'}} align='right'><CoTypography size="AdminUser">3000P 차감</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:'25%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
            <TableCell sx={{width:'45%'}}><CoTypography size="AdminUser">토스페이로 포인트 추가ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography></TableCell>
            <TableCell sx={{width:'30%'}} align='right'><CoTypography size="AdminUser">3000P 지급</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:'25%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
            <TableCell sx={{width:'45%'}}><CoTypography size="AdminUser">토스페이로 포인트 추가ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography></TableCell>
            <TableCell sx={{width:'30%'}} align='right'><CoTypography size="AdminUser">3000P 지급</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:'25%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
            <TableCell sx={{width:'45%'}}><CoTypography size="AdminUser">토스페이로 포인트 추가ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography></TableCell>
            <TableCell sx={{width:'30%'}} align='right'><CoTypography size="AdminUser">3000P 지급</CoTypography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:'25%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
            <TableCell sx={{width:'45%'}}><CoTypography size="AdminUser">토스페이로 포인트 추가ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography></TableCell>
            <TableCell sx={{width:'30%'}} align='right'><CoTypography size="AdminUser">3000P 지급</CoTypography></TableCell>
            </TableRow>
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
            <Button><CoTypography size="HoverText">등록하기</CoTypography></Button>
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
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">손우성</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">김의현</CoTypography></TableCell>
                <TableCell sx={{width:'40%'}}><CoTypography size="AdminUser">프로젝트 참여 안함</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}} align='right'><CoTypography size="AdminUser">미처리</CoTypography></TableCell>
                </TableRow>
                <TableRow>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">손우성</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">김의현</CoTypography></TableCell>
                <TableCell sx={{width:'40%'}}><CoTypography size="AdminUser">프로젝트 참여 안함</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}} align='right'><CoTypography size="AdminUser">미처리</CoTypography></TableCell>
                </TableRow>
                <TableRow>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">손우성</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">김의현</CoTypography></TableCell>
                <TableCell sx={{width:'40%'}}><CoTypography size="AdminUser">프로젝트 참여 안함</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}} align='right'><CoTypography size="AdminUser" sx={{color:'#558BCF'}}>처리 완료</CoTypography></TableCell>
                </TableRow>
                <TableRow>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">손우성</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">김의현</CoTypography></TableCell>
                <TableCell sx={{width:'40%'}}><CoTypography size="AdminUser">프로젝트 참여 안함</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}} align='right'><CoTypography size="AdminUser" sx={{color:'#558BCF'}}>처리 완료</CoTypography></TableCell>
                </TableRow>
                <TableRow>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">2024/03/15</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">손우성</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}}><CoTypography size="AdminUser">김의현</CoTypography></TableCell>
                <TableCell sx={{width:'40%'}}><CoTypography size="AdminUser">프로젝트 참여 안함</CoTypography></TableCell>
                <TableCell sx={{width:'15%'}} align='right'><CoTypography size="AdminUser" sx={{color:'#558BCF'}}>처리 완료</CoTypography></TableCell>
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
