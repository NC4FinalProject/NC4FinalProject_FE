import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChapterOne from './ChapterOne';
import ChapterTwo from './ChapterTwo';
import ChapterThree from './ChapterThree';
import { Grid } from '@mui/material';
import { useChapterOneStore, useChapterTwoStore, useChapterThreeStore } from '../../../../stores/ContentsStore';
import { insertApi } from '../../../../api/ContentsApi';
import { useNavigate } from 'react-router-dom';

const steps = ['기본등록', '강의코스', '강의소개'];

export default function LinearStepper() {

  
  const { chapterOne, videoInfo, videoFile, thumbnail } = useChapterOneStore();
  const { chapterTwo } = useChapterTwoStore();
  const { contentsData, contentsFileDTOList} = useChapterThreeStore();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const navi = useNavigate();

  const isStepOptional = (step) => {
    console.log("상태값"+activeStep);
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async (e) => {
    // console.log(e.target.textContent);
    if(e.target.textContent === 'Finish') {
      await handleSave();
      alert("강의가 등록됐습니다.");
      navi("/list");
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    console.log("넥스트 후 상태값" + activeStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    console.log("백 후 상태값" + activeStep);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSave = () => {
    insertApi(chapterOne, chapterTwo, videoInfo, videoFile, thumbnail, contentsData, contentsFileDTOList);
    console.log("=====버튼쪽========" + chapterOne +"11111"+ chapterTwo +"11111"+ videoInfo +"11111"+ videoFile +"11111"+ thumbnail);
  };

  return (
    <Box sx={{ width: '100%' }}>
      
      <Grid container justifyContent="center">

        <Grid item xs={12} md={9}>

          <Stepper activeStep={activeStep} sx={{ width: '100%' }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = (
              //    <Typography variant="caption">Optional</Typography>
              //   );
              // }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

        </Grid>
        
      </Grid>
      
      {/* 마지막 리셋 버튼이유 */}
      {activeStep === steps.length ? (
      <Grid container justifyContent="center"  sx={{ mb: '5rem', }}>
        <Grid container direction={'column'} py={'10rem'}>
          <Fragment>
            <Grid sx={{justifyItems: "center"}}>
            </Grid>
           <Typography sx={{ mt: 2, mb: 1 }}>
              컨텐츠가 정상적으로 등록되었어요.&apos;&apos;&apos;굳잡
            </Typography>
            
            <Grid sx={{ display: 'flex',  pt: 2, justifyContent:'center' }}>
              {/* <Button onClick={handleReset}>마이페이지로 이동</Button> */}
              <Button onClick={handleReset}>컨텐츠로 이동</Button>
              <Button onClick={handleSave}>데이터를 저장</Button>
            </Grid>
          </Fragment>
        </Grid>
        
      </Grid>

      ) : (

        <Fragment>
          {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}

            {/* 이것이 챕터 체인지 */}
            <Box sx={{py: 3.5}}>  
              {activeStep === 0 && (<ChapterOne/>)}
              {activeStep === 1 && (<ChapterTwo/>)}
              {activeStep === 2 && (<ChapterThree/>)}
            </Box>
            
          <Grid container justifyContent="center" sx={{ mb: '5rem', }}>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>

              </Box>
            </Grid>
          </Grid>

        </Fragment>
      )}
    </Box>
  );
}
