import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CoTypography from "../atoms/common/CoTypography";
import CoSelect from "../organisms/common/CoSelect";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

const Reportdialog = ({ open, handleClickClose }) => {
  const [report, setReport] = useState("");
  const [reason, setReason] = useState("");

  const handleReportChange = (newValue) => {
    setReport(newValue);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
    console.log(event.target.value);
  };

  const handleCancel = () => {
    console.log(reason);
    console.log(report);
    setReport("");
    setReason("");
    handleClickClose();
  };

  const handleSubmit = () => {
    console.log(reason);
    console.log(report);
    setReport("");
    setReason("");
    handleClickClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
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
          <CoSelect value={reason} onChange={handleReasonChange}></CoSelect>
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
                </CoTypography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  multiline
                  rows={6}
                  value={report}
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
            style={{ marginRight: "1.25rem" }}
          >
            취소하기
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            등록하기
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Reportdialog;
