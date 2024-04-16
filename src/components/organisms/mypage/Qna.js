import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CoTypography from "../../atoms/common/CoTypography";
import {Paper, Table, TableBody, TableCell, TableRow, TextField,} from "@mui/material";
import MemberStore from "../../../stores/MemberStore";

const QnaDialog = ({open, handleClickClose, children, selectComponent, Title, onSubmit, category, detailReason,handleReasonChange,isAnswered}) => {
    const {memberInfo} = MemberStore();

    const handleCancel = () => {
        handleClickClose();
    };

    const handleSubmit = () => {
        onSubmit();
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
            sx={{'& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
                width: '100%',
                margin:'0'
            }}}
            disableEscapeKeyDown
        >
            <DialogTitle style={{marginTop: "0.5rem"}}>
                <CoTypography size="DialogTitle">{Title}</CoTypography>
            </DialogTitle>
            <DialogContent
                style={{
                    padding: "1rem",
                    paddingTop: '0',
                }}
            >
                <Box sx={{margin: "0.5rem auto 0"}}>
                    {selectComponent}
                </Box>
                <Table
                    sx={{
                        borderCollapse: "collapse",
                        borderStyle: "hidden",
                        margin: "0.5rem auto 0",
                        width: "100%",
                        borderRadius: "0.25rem",
                        boxShadow: "inset 0 0 0 1px #E0E0E0",
                        textAlign: "center",
                        width:'100%'
                    }}
                >
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <CoTypography size="Content">
                                    작성자 : {memberInfo && memberInfo.userNickname ? memberInfo.userNickname : null} <br/>
                                    작성일 : {new Date().toLocaleDateString()}<br/>
                                </CoTypography>
                                {memberInfo && memberInfo.role === "ADMIN" ?  <CoTypography>카테고리: {category}</CoTypography> : ""}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    multiline
                                    rows={8}
                                    value={detailReason}
                                    onChange={handleReasonChange}
                                    fullWidth
                                    variant="standard"
                                    placeholder="상세적인 내용을 작성해주세요."
                                    required
                                    sx={{
                                        width: "100%",
                                    }}
                                    InputProps={{disableUnderline: true}}
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
                    }}
                >
                    {isAnswered ? (
                        <Button
                            onClick={handleCancel}
                            variant="outlined"
                            style={{
                                marginRight: "1.25rem",
                                color: "black",
                                borderColor: "#ced4da",
                            }}
                        >
                            닫기
                        </Button>
                    ) : (
                        <>
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
                                {memberInfo && memberInfo.role === "ADMIN" ? "답변하기" : "문의하기"}
                            </Button>
                        </>
                    )}
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default QnaDialog;