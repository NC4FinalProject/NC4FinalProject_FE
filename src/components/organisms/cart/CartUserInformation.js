import React from "react";
import CoTypography from "../../atoms/common/CoTypography";
import { Grid } from "@mui/material";

const CartInformation = ({ userNickname, userEmail }) => {
  return (
    <>
      <Grid
        container
        sx={{
          border: "1px solid #868e96",
          borderRadius: "0.25rem",
          padding: "1rem 1.5rem",
          margin: "2rem 0 1rem 0",
        }}
        justifyContent={"space-between"}
      >
        <Grid container item xs={12} borderBottom={"1px solid #868e96"}>
          <Grid item xs={6} mb={"1rem"}>
            <CoTypography size="Tag" style={{ color: "black" }}>
              구매자정보
            </CoTypography>
          </Grid>

          <Grid
            item
            xs={6}
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ cursor: "pointer" }}
          >
            <CoTypography size="Tag">
              <span style={{ textDecoration: "underline" }}>수정하기</span>
            </CoTypography>
          </Grid>
        </Grid>
        <Grid container item xs={12} direction={"column"} mt="1rem">
          <Grid container>
            {/* <Grid item xs={4}>
              <CoTypography size="Tag">닉네임</CoTypography>
            </Grid>
            <Grid item xs={8}>
              <CoTypography size="Tag">{userNickname}</CoTypography>
            </Grid> */}
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <CoTypography size="Tag">이메일</CoTypography>
            </Grid>
            <Grid item xs={8}>
              <CoTypography size="Tag">{userEmail}</CoTypography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <CoTypography size="Tag">닉네임</CoTypography>
            </Grid>
            <Grid item xs={8}>
              <CoTypography size="Tag">{userNickname}</CoTypography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CartInformation;
