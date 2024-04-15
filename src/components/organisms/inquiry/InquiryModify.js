import { Box } from "@mui/system";
import React from "react";
import CoTypography from "../../atoms/common/CoTypography";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

const InquiryPost = () => {
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
          >
            취소
          </Button>
          <Button color="primary" variant="contained">
            수정
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
            control={<Checkbox defaultChecked />}
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
          placeholder="관련 태그 설정 (최대 3개)"
          sx={{
            "& .MuiInputBase-input::placeholder": {
              fontSize: "1rem",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#212529",
            },
            padding: "1rem 2rem 2rem 2rem",
          }}
          InputProps={{ disableUnderline: true }}
        ></TextField>
      </Box>
      <Box sx={{ width: "90%", margin: "2rem auto" }}>
        <CKEditor
          editor={ClassicEditor}
          // data={content}
          // onChange={handleContentChange}
          config={{
            extraPlugins: [UploadAdapterPlugin],
          }}
        />
      </Box>
    </>
  );
};

export default InquiryPost;
