import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CoTypography from "../../atoms/common/CoTypography";
import InquirySelect from "./InquirySelect";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

const InquiryReportDialog = ({ open, handleClickClose }) => {
  const [reportReason, setReportReason] = useState("");
  const [detailReason, setDetailReason] = useState("");

  const handleReportChange = (e) => {
    setReportReason(e.target.value);
  };

  const handleReasonChange = (event) => {
    setDetailReason(event.target.value);
    console.log(event.target.value);
  };

  const handleCancel = () => {
    console.log(reportReason);
    console.log(detailReason);
    setReportReason("");
    setDetailReason("");
    handleClickClose();
  };

  const handleSubmit = () => {
    console.log(reportReason);
    console.log(detailReason);
    setReportReason("");
    setDetailReason("");
    handleClickClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(event, detailReason) => {
        if (detailReason !== "backdropClick") {
          handleClickClose(event);
        }
      }}
      disableEscapeKeyDown
    >
      <DialogTitle style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
        <CoTypography size="DialogTitle">신고하기</CoTypography>
      </DialogTitle>
      <DialogContent
        style={{
          width: "28.125rem",
          height: "27rem",
          padding: "1rem",
          margin: "0 auto",
        }}
      >
        <Box
          style={{
            width: "95%",
            maxWidth: "26rem",
            background: "#EFEFEF",
            padding: "0.625rem",
            margin: "0 auto",
            borderRadius: "0.25rem",
          }}
        >
          <CoTypography size="Content" style={{ marginBottom: "35px" }}>
            1. 허위신고는 처벌 대상입니다.
          </CoTypography>
        </Box>
        <Box sx={{ margin: "0.5rem auto 0", maxWidth: "27rem" }}>
          <InquirySelect
            value={reportReason}
            onChange={handleReportChange}
          ></InquirySelect>
        </Box>
        <Table
          sx={{
            borderCollapse: "collapse",
            borderStyle: "hidden",
            margin: "0.5rem auto 0",
            width: "100%",
            maxWidth: "27rem",
            borderRadius: "0.25rem",
            boxShadow: "inset 0 0 0 1px #E0E0E0",
            textAlign: "center",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell>
                <CoTypography size="Content">
                  작성자 : USER <br />
                  작성일 : 2021-10-10
                  {/* {udtDate
                    ? format(new Date(udtDate), "yyyy-MM-dd")
                    : crtDate
                    ? format(new Date(crtDate), "yyyy-MM-dd")
                    : "Unknown"} */}
                </CoTypography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  multiline
                  rows={6}
                  value={reportReason}
                  onChange={(e) => handleReportChange(e.target.value)}
                  fullWidth
                  variant="standard"
                  placeholder="상세적인 내용을 작성해주세요."
                  required
                  sx={{
                    width: "100%",
                  }}
                  InputProps={{ disableUnderline: true }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            justifyContent: "center",
            width: "100%",
            display: "flex",
            transform: "translateY(-60%)",
          }}
        >
          <Button
            onClick={handleCancel}
            variant="outlined"
            style={{
              marginRight: "1.25rem",
              color: "black",
              borderColor: "#ced4da",
            }}
          >
            취소하기
          </Button>
          <Button onClick={handleSubmit} color="error" variant="contained">
            신고하기
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default InquiryReportDialog;
