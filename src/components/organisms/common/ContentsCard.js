import React, { useEffect, useState } from 'react';
import { Box, Hidden, Paper } from '@mui/material';
import Rating from '@mui/material/Rating';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from "react-router-dom";
import CoTypography from '../../atoms/common/CoTypography';
import { useContentsListStore } from '../../../stores/ContentsStore';

function ContentsCard({
                          category, contentsId, contentsTitle, memberId, userNickname, price, thumbnail, index,
                          reviewRating, reviewCount, paperstyle, booked, sx
                      }) {

    const { selectPageChange } = useContentsListStore();
    const navi = useNavigate();
    const [formatPrice, setFormatPrice] = useState("");

    const goDetail = (contentsId) => {
        return () => {
            selectPageChange(contentsId);
            navi(`/detail/${contentsId}`);
        };
    };

    useEffect(() => {
        if(typeof price === "number") {
            if(price === 0) {
                setFormatPrice("무료");
            } else if(price === -1) {
                setFormatPrice("국가");
            } else {
                setFormatPrice(price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원");
            }
        }
    }, [price]);

    return (
        <>
        <Hidden lgUp>
        <Box sx={{width:'100%'}}>
            <Paper elevation={1} style={{ width:'100%', height:'11.875rem', borderRadius:'0.5rem', marginTop:'1.5rem', marginRight:'1.5rem', position:'relative', ...paperstyle }}>
                <Box onClick={goDetail(contentsId)} sx={{ cursor:'pointer' }}>
                    <img src={`https://kr.object.ncloudstorage.com/envdev/${thumbnail}`} alt='thumbnail' style={{ width:'100%', height:'15rem', objectFit:'cover', borderRadius:'0.25rem' }} />
                </Box>
                
            </Paper>

            <Box onClick={goDetail(contentsId)} sx={{paddingTop:'3rem'}}>
                <CoTypography sx={{ cursor:'pointer' }} style={{ marginTop:'5px', width:'19.1875rem' }}>{contentsTitle}</CoTypography>
            </Box>
            <CoTypography size="Content" style={{ color:'#7d7d7d', width:'19.1875rem' }}>{category} | {userNickname}</CoTypography>

            <div style={{ display:'flex', alignItems:'center', justifyContent: 'space-between', width:'100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Rating name="read-only" value={reviewRating !== undefined ? reviewRating : null} readOnly style={{ fontSize:'1rem' }} />
                    <CoTypography size="Tag">({reviewCount})</CoTypography>
                </div>
                <CoTypography size="Content">{formatPrice}</CoTypography>
            </div>
        </Box>
        </Hidden>
        <Hidden lgDown>
        <Box sx={sx}>
            <Paper elevation={1} style={{ width:'19.1875rem', height:'11.875rem', borderRadius:'0.5rem', marginTop:'1.5rem', marginRight:'1.5rem', position:'relative', ...paperstyle }}>
                <Box onClick={goDetail(contentsId)} sx={{ cursor:'pointer' }}>
                    <img src={`https://kr.object.ncloudstorage.com/envdev/${thumbnail}`} alt='thumbnail' style={{ width:'19.1875rem', height:'11.875rem', objectFit:'cover', borderRadius:'0.25rem' }} />
                </Box>
                {/* {Localbooked ? (
                    <Box onClick={changeBooked}>
                        <BookmarkIcon sx={{ cursor:'pointer' }} style={{ position:'absolute', top:'5px', right:'5px', color:'#FFD400' }} />
                    </Box>
                ) : (
                    <Box onClick={changeBooked}>
                        <BookmarkBorderIcon sx={{ cursor:'pointer' }} style={{ position:'absolute', top:'5px', right:'5px' }} />
                    </Box>
                )} */}
            </Paper>

            <Box onClick={goDetail(contentsId)}>
                <CoTypography sx={{ cursor:'pointer' }} style={{ marginTop:'5px', width:'19.1875rem' }}>{contentsTitle}</CoTypography>
            </Box>
            <CoTypography size="Content" style={{ color:'#7d7d7d', width:'19.1875rem' }}>{category} | {userNickname}</CoTypography>

            <div style={{ display:'flex', alignItems:'center', justifyContent: 'space-between', width:'19.1875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Rating name="read-only" value={reviewRating !== undefined ? reviewRating : null} readOnly style={{ fontSize:'1rem' }} />
                    <CoTypography size="Tag">({reviewCount})</CoTypography>
                </div>
                <CoTypography size="Content">{formatPrice}</CoTypography>
            </div>
        </Box>
        </Hidden>
        </>
    );
}

export default ContentsCard;
