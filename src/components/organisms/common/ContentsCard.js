import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import Rating from '@mui/material/Rating';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from "react-router-dom";
import CoTypography from '../../atoms/common/CoTypography';
import { useContentsListStore } from '../../../stores/ContentsStore';

function ContentsCard({
                          category, contentsId, contentsTitle, memberId, price, thumbnail, index,
                          rating, reviews, paperstyle, booked, sx
                      }) {

    const { selectPageChange } = useContentsListStore();
    const navi = useNavigate();
    const [Localbooked, setBooked] = useState(booked);

    const goDetail = (contentsId) => {
        return () => {
            selectPageChange(contentsId);
            navi(`/detail/${contentsId}`);
        };
    };

    const changeBooked = () => {
        setBooked(!Localbooked);
    };

    useEffect(() => {
        console.log(thumbnail);
    }, [thumbnail]);

    return (
        <Box sx={sx}>
            <Paper elevation={1} style={{ width:'19.1875rem', height:'11.875rem', borderRadius:'0.5rem', marginTop:'1.5rem', marginRight:'1.5rem', position:'relative', ...paperstyle }}>
                <Box onClick={goDetail(contentsId)} sx={{ cursor:'pointer' }}>
                    <img src={`https://kr.object.ncloudstorage.com/envdev/${thumbnail}`} alt='thumbnail' style={{ width:'19.1875rem', height:'11.875rem', objectFit:'cover', borderRadius:'0.25rem' }} />
                </Box>
                {Localbooked ? (
                    <Box onClick={changeBooked}>
                        <BookmarkIcon sx={{ cursor:'pointer' }} style={{ position:'absolute', top:'5px', right:'5px', color:'#FFD400' }} />
                    </Box>
                ) : (
                    <Box onClick={changeBooked}>
                        <BookmarkBorderIcon sx={{ cursor:'pointer' }} style={{ position:'absolute', top:'5px', right:'5px' }} />
                    </Box>
                )}
            </Paper>

            <Box onClick={goDetail(contentsId)}>
                <CoTypography sx={{ cursor:'pointer' }} style={{ marginTop:'5px', width:'19.1875rem' }}>{contentsTitle}</CoTypography>
            </Box>
            <CoTypography size="Content" style={{ color:'#7d7d7d', width:'19.1875rem' }}>{category} | {memberId}</CoTypography>

            <div style={{ display:'flex', alignItems:'center', width:'19.1875rem' }}>
                <Rating name="read-only" value={rating} readOnly style={{ fontSize:'1rem' }} />
                <CoTypography size="Tag">({reviews})</CoTypography>
            </div>
        </Box>
    );
}

export default ContentsCard;
