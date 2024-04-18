import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CoTypography from "../../atoms/common/CoTypography";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Chip,
  Grid
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import MemberStore from "../../../stores/MemberStore";
import useStore from "../../../stores/InquiryStore";
import axios from "axios";
import { useContentsStore } from "../../../stores/ContentsStore";

const InquiryPost = ({ onCancelClick, scrollToTop, contentsId }) => {
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
    isPrivate,
    setIsPrivate,
  } = useStore();

  const { contentsTitle } = useContentsStore();

  const [tagContent, setTagContent] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");

  const { userRole } = MemberStore();
  const tempFileDTOList = [];

  const handleTagChange = (event) => {
    if (event.target.value.length <= 10) {
      setTagInput(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (
        tagInput &&
        !tagContent.includes(tagInput) &&
        tagContent.length < 3 &&
        tagInput.length <= 10
      ) {
        setTagContent([...tagContent, tagInput]);
        setTagInput("");
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setIsPrivate(event.target.checked);
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTagContent((prevTagContent) =>
      prevTagContent.filter((tag) => tag !== tagToDelete)
    );
  };

  const handleCancelClick = () => {
    if (window.confirm("작성중인 글은 저장되지 않습니다. 취소하시겠습니까? ")) {
      alert("취소되었습니다.");
      onCancelClick();
      scrollToTop();
    }
  };

  const handleTitleChange = (e) => {
    setInquiryTitle(e.target.value);
  };

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
          글 쓰기 (질문하기)
        </CoTypography>

        <Box sx={{ display: "flex-end" }}>
          <Button
            variant="outlined"
            style={{
              marginRight: "0.625rem",
              color: "black",
              borderColor: "#ced4da",
            }}
            onClick={() => handleCancelClick()}
          >
            취소
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              handleInquirySubmit(
                inquiryTitle,
                inquiryContent,
                tagContent,
                contentsId,
                inquiryFileDTOList
              )
            }
          >
            등록
          </Button>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={9}>
          <TextField
            fullWidth
            variant="standard"
            placeholder={contentsTitle}
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
              control={
                <Checkbox checked={isPrivate} onChange={handleCheckboxChange} />
              }
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
          onChange={handleTitleChange}
        ></TextField>

        <TextField
          variant="standard"
          placeholder="#관련 태그 설정 (최대 3개, 글자수 10 미만) "
          sx={{
            "& .MuiInputBase-input::placeholder": {
              fontSize: "1rem",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#212529",
            },
            padding: "1rem 2rem 1rem 2rem",
          }}
          value={tagInput}
          onChange={handleTagChange}
          onKeyDown={handleKeyDown}
          InputProps={{ disableUnderline: true }}
        ></TextField>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            padding: "0rem 1rem 1rem 1rem",
          }}
        >
          {tagContent.map((tag, index) => (
            <Chip
              color="primary"
              key={index}
              label={tag}
              onDelete={handleDeleteTag(tag)}
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
            removePlugins: ["MediaEmbed"],
          }}
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "300px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
        />
      </Box>
    </>
  );
};

export default InquiryPost;
