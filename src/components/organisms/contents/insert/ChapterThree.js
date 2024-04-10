import {Grid} from '@mui/material'
import React, {useState} from 'react'
import InsertCKEditor from '../../../atoms/common/InsertCKEditor'
import CoTypography from '../../../atoms/common/CoTypography'

const ChapterThree = () => {
    const [introduce, setIntroduce] = useState("");

    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        setIntroduce(data);
    };

    return (
        <>
            <Grid container justifyContent="center" sx={{my: '2rem',}}>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <CoTypography size="Title" style={{marginBottom: '24px'}}>강의소개</CoTypography>
                    <InsertCKEditor onChange={handleContentChange}/>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        </>
    )
}

export default ChapterThree
