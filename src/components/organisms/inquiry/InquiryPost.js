import { Box } from "@mui/system";
import React from "react";
import CoTypography from "../../atoms/common/CoTypography";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Chip,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

const InquiryPost = ({ onCancelClick, scrollToTop }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagChange = (event) => {
    setTagInput(event.target.value.trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (tagInput && !tags.includes(tagInput) && tags.length < 3) {
        setTags([...tags, tagInput]);
        setTagInput("");
      }
    }
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleCancelClick = () => {
    if (window.confirm("작성중인 글은 저장되지 않습니다. 취소하시겠습니까? ")) {
      alert("취소되었습니다.");
      onCancelClick();
      scrollToTop();
    }
  };

  function UploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: async () => {
          const file = await loader.file;
          console.log(file);
          // setFiles(file);
          // return await handleUpload(file);
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
          <Button color="primary" variant="contained">
            등록
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #adb5bd",
          width: "95%",
          margin: "auto",
        }}
      >
        <TextField
          variant="standard"
          placeholder="강의명 : 모르니까 자바다"
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
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
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
      </Box>
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
        ></TextField>

        <TextField
          variant="standard"
          placeholder="#관련 태그 설정 (최대 3개) "
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
          {tags.map((tag, index) => (
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
          // data={content}
          // onChange={handleContentChange}
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "300px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          config={{
            extraPlugins: [UploadAdapterPlugin],
            removePlugins: ["MediaEmbed"],
          }}
        />
      </Box>
    </>
  );
};

export default InquiryPost;
