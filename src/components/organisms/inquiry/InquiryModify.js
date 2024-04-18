import { Box } from "@mui/system";
import React, {useState, useEffect} from "react";
import CoTypography from "../../atoms/common/CoTypography";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Grid,
  Chip
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useStore from "../../../stores/InquiryStore";
import axios from "axios";


const InquiryPost = ({onCancelClick, onListClick}) => {
  
  
  const {
    inquiries,
    paymentList,
    searchCondition,
    searchKeyword,
    likeCnt,
    liked,
    setLikeCheck,
    setLikeCnt,
    setInquiryFiles,
    setInquiryFileDTOList,
    setInquiries,
    setSearchCondition,
    setSearchKeyword,
    fetchInquiries,
    handleInquirySubmit,
    inquiryFiles,
    inquiryFileDTOList,
    handleInquiryModifySubmit,
    isPrivate,
    setIsPrivate,
    inquiry,
  } = useStore();

  const [inquiryContent, setInquiryContent] = useState();
  const [inquiryTitle, setInquiryTitle] = useState();

  const tempFileDTOList = [];

  function UploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: async () => {
          const file = await loader.file;
          console.log(file);
          setInquiryFiles(file);
          return await handleUpload(file);
        },
      };
    };
  }

  useEffect(() => {
    if(inquiry) {
      setIsPrivate(inquiry.private);
      setInquiryTitle(inquiry.inquiryTitle);
      setInquiryContent(inquiry.inquiryContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">"));
    }
  }, [inquiry]);

  const handleContentChange = (e, editor) => {
    const data = editor.getData();
    setInquiryContent(data);
  };

  const handleUpload = async (inquiryFile) => {
    try {
      const formData = new FormData();
      formData.append("upload", inquiryFile);
      const response = await axios.post(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      tempFileDTOList.push({
        inquiryFilePath: response.data.inquiryFilePath,
        inquiryFileName: response.data.inquiryFileName,
        inquiryFileOrigin: response.data.inquiryFileOrigin,
      });

      console.log(inquiryFileDTOList);
      setInquiryFileDTOList(tempFileDTOList);
      return { default: response.data.url };
    } catch (error) {
      console.log(error);
      console.error("Error uploading files: ", error);
      return { error: { message: "Files upload failed" } };
    }
  };

  const handleCheckboxChange = (event) => {
    setIsPrivate(event.target.checked);
  };

  const handleTitleChange = (event) => {
    setInquiryTitle(event.target.value);
  };

  const handleModify = async () => {
    await handleInquiryModifySubmit(
      inquiry.inquiryId,
      inquiryTitle,
      inquiryContent,
      inquiry.tagDTOList,
      inquiry.contentsId
    );
    
    onCancelClick();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBlock: "2px solid black",
          padding: "2rem 1rem 2rem 1rem",
        }}
      >
        <CoTypography size="WriteTitle" component="h1" gutterBottom>
          글 수정 (질문하기)
        </CoTypography>

        <Box sx={{ display: "flex-end" }}>
          <Button
            variant="contained"
            style={{ marginRight: "0.625rem", color: "white" }}
            color="green"
            onClick={onListClick}
          >
            목록
          </Button>
          <Button
            variant="outlined"
            style={{
              marginRight: "0.625rem",
              color: "black",
              borderColor: "#ced4da",
            }}
            onClick={onCancelClick}
          >
            취소
          </Button>
          <Button color="primary" variant="contained" onClick={() => handleModify()}>
            수정
          </Button>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={9}>
          <TextField
            fullWidth
            variant="standard"
            placeholder={`강의명 : ${inquiry.contentsTitle}`}
            disabled
            sx={{
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.25rem",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#212529",
              },
              padding: "2rem 2rem 2rem 1rem",
            }}
            InputProps={{ disableUnderline: true }}
          />
        </Grid>
        <Grid item 
              xs={3} 
              sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
              }}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked checked={isPrivate} onChange={handleCheckboxChange}/>}
              label={
                <CoTypography size="NoticeTitle" sx={{ ml: "-0.25rem" }}>
                  비밀글여부
                </CoTypography>
              }
              sx={{
                width: "max-content",
                "& .MuiSvgIcon-root": { fontSize: 28 },
              }}
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "auto",
          marginTop: "1.875rem",
          border: "1px solid #adb5bd",
        }}
      >
        <TextField
          variant="standard"
          placeholder="제목을 입력하세요."
          sx={{
            "& .MuiInputBase-input::placeholder": {
              fontSize: "1.25rem",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#212529",
            },
            padding: "2rem 2rem 0 2rem",
          }}
          InputProps={{ disableUnderline: true }}
          value={inquiryTitle}
          onChange={handleTitleChange}
        ></TextField>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            padding: "0rem 1rem 1rem 1rem",
          }}
        >
          {inquiry.tagDTOList && inquiry.tagDTOList.map((tag, index) => (
            <Chip
              color="primary"
              key={index}
              label={tag.tagContent}
              style={{ margin: "0.5rem" }}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ width: "90%", margin: "2rem auto" }}>
        <CKEditor
          editor={ClassicEditor}
          data={inquiryContent}
          onChange={handleContentChange}
          config={{
            extraPlugins: [UploadAdapterPlugin],
          }}
        />
      </Box>
    </>
  );
};

export default InquiryPost;
