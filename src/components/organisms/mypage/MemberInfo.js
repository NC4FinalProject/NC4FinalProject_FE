import React, { useState, useRef, useEffect } from 'react'
import { Grid, Container, Typography, TextField, Button, Box, Avatar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MoonLoader} from "react-spinners";

const MemberInfo = () => {


    const [profileImage, setImage] = useState(null);
    const navi = useNavigate();
    const [role, setRole] = useState(null);
    const [userNickname, setUserNickname] = useState(null);
    const [isEmailVerification, setIsEmailVerification] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        thumbnailInput.current.click();
      };
    
      const handleOnChangeUserNickname = (e) => {
        setUserNickname(e.target.value);
      }

      const emailVerification = (e) => {
        navi('/member/email-verification');
      }

    const thumbnailInput = useRef();

    const initialize = async e => {
        try { 
            const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/mypage`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                        }
                    });
            
                setImage(response.data.item.profileFile);
                setUserNickname(response.data.item.userNickname);
                setRole(response.data.item.role);
                setIsEmailVerification(response.data.item.emailVerification);
                console.log("response.data.item");
                console.log(response.data.item);
                console.log(isEmailVerification);
                setLoading(false);
            
        } catch (error) {
            console.warn("이미지 불러오기 실패", error);
            sessionStorage.removeItem("ACCESS_TOKEN");
            navi('/');
        }
    }

    useEffect( () => {
        initialize();
    }, [navi]);

    if (loading) {
        return (
        <Grid Container marginBottom='30%' marginTop='10%'style={{ position: 'flex'}} >
            <Grid item xs={12} style={{ position: 'absolute', left: '50%'}}>
                <MoonLoader color="#558BCF" />
            </Grid>
            
        </Grid> 
        )
    }

    const saveFileImage = async e => {
        try {
            const formData = new FormData();
            formData.append('profile_image', e.target.files[0]);
            
            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    'Content-Type': 'multipart/form-data'
                },
            };
            try {
            const response = await axios.post(
            `http://${process.env.REACT_APP_BACK_URL}/mypage/profile-file`,
            formData, 
            config
            ); 
        } catch (error) {
                console.warn(error);
            }
        window.location.reload();
        } catch (error) {
            console.warn("이미지 업로드 실패");
        }
      };

    const updateUserNickname = async e => {
        try {
            const formData = new FormData();
            formData.append('user_nickname', userNickname);

            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            try {
                const response = await axios.post(
                    `http://${process.env.REACT_APP_BACK_URL}/mypage/user-nickname`,
                    formData, 
                    config
                ); 
            } catch (error) {
                console.warn(error);
                if (error.response.data.errorCode === 202) {
                    alert("이미 존재하는 닉네임 입니다.");
                    }
            }
            } catch (error) {
                console.warn("닉네임 변경 실패");
                }   
      };

      const wannabeTeacher = async e => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                }
            };

            try {
                const response = await axios.get(
                    `http://${process.env.REACT_APP_BACK_URL}/mypage/wannabe-teacher`,
                    config
                ); 
                alert("강사 신청 완료");
            } catch (error) {
                console.warn(error);
                if (error.response.data.errorCode === 202) {
                    alert("이미 강사 입니다.");
                    }
            }
            } catch (error) {
                console.warn("강사 신청 실패");
                }   
      };

      const resign = async e => {
                try {
                    const response = await axios.delete(
                        `http://${process.env.REACT_APP_BACK_URL}/member/resign`,
                        {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                            }
                        }
                    )
                    const response2 = await axios.get(
                        `http://${process.env.REACT_APP_BACK_URL}/member/logout`,
                        {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                            }
                        }
                    )
                    sessionStorage.removeItem("ACCESS_TOKEN");
                    window.alert("회원탈퇴 성공.");
                    navi("/");

                } catch (error) {
                        alert("회원탈퇴하실 수 없습니다.");
                }
      };

  return (
    <div>
        <form>
            <Grid container spacing={2} sx={{width: '40%', marginLeft: '30%'}}>
                <Grid item xs={12}>
                    <Typography component="h1" style={{textAlign: 'center', marginTop: '5%', fontSize:'3rem'}}>
                        계정 정보
                    </Typography>
                </Grid>
                <Grid container xs={12} style={{justifyContent: 'center', textAlign: 'center'}}>
                    <Grid item xs={6}>
                        <Box item xs={10}>
                        {profileImage === null ? (
                            <Avatar src="/broken-mage.jpg" style={{width: '200px', height: '200px', borderRadius: '70%', marginLeft: '15%'}}/> 
                            ) : (
                            <img src={`https://kr.object.ncloudstorage.com/envdev/`+profileImage} alt='thumbnail' style={{width: '200px', height: '200px', borderRadius: '70%'}}/> 
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h1" variant="h5" style={{textAlign: 'center', marginTop: '15%'}}>
                            프로필
                        </Typography>
                        <Button onClick={handleClick} variant="contained" color="primary" style={{height:'55px', width: '10rem', fontSize:'18px', marginTop: '15%'}}>
                            사진 변경
                            <input type='file' accept='image/jpg, image/jpeg, image/png' multiple ref={thumbnailInput} onChange={saveFileImage} style={{ display: 'none' }} />
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="userNickname"
                        variant="outlined"
                        fullWidth
                        id="userNickname"
                        label="닉네임"
                        defaultValue={ userNickname === null ? ("닉네임을 입력해주세요.") : (userNickname)}
                        onChange={handleOnChangeUserNickname}
                    ></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button type="button" onClick={updateUserNickname} fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px', marginBottom: '5%'}}>
                        닉네임 변경하기
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h2" variant='string' style={{textAlign: 'left'}}>
                        { role === "TEACHER"|| role === "PRETEACHER" ? (
                            "이미 강사 계정이거나 신청되었습니다."
                            ) : ( 
                            "아직 강사가 아닙니다."
                            ) 
                        }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                { role === "TEACHER"|| role === "PRETEACHER" ? (
                        <Button type="submit" disabled fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px', marginBottom: '15%'}}>
                            이미 강사 계정이거나 신청되었습니다.
                        </Button>
                            ) : ( 
                        <Button type="submit" onClick={wannabeTeacher} fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px', marginBottom: '15%'}}>
                            강사 계정으로 전환 신청하기
                        </Button>
                            ) 
                        }
                    
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" onClick={resign} fullWidth variant="contained" color="gray" style={{height:'55px', fontSize:'18px', marginBottom: '15%'}}>
                        회원탈퇴
                    </Button>
                </Grid>
            </Grid>
        </form>
    </div>
  )
}

export default MemberInfo