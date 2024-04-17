import { Button, Grid } from "@mui/material";
import React, {useCallback, useEffect} from "react";
import CoTypography from "../../atoms/common/CoTypography";
import {useNavigate} from 'react-router-dom';

const CartPayment = ({totalPrice, selectedItem, userNickname, userEmail}) => {
  const navi = useNavigate();

  const openPaymentWidget = useCallback(async () => {
    if(selectedItem.length <= 0) {
      alert("결제할 강의를 먼저 선택하세요.");
      return;
    }

    if(totalPrice <= 0) {
      navi("/payment/success");
      return;
    }

    navi("/paymentWidget", {state: {selectedItem: selectedItem, userNickname: userNickname, userEmail: userEmail}})
  }, [selectedItem, totalPrice]);

  return (
    <>
      <Grid
        sx={{
          border: "1px solid #868e96",
          borderRadius: "0.25rem",
          padding: "1rem 1.5rem",
        }}
      >
        <Grid container justifyContent={"space-between"}>
          <Grid mb="1rem">
            <CoTypography size="Tag" style={{ color: "black" }}>
              총 결제금액
            </CoTypography>
          </Grid>
          <Grid>
            <CoTypography size="Tag" style={{ color: "black" }}>
              {totalPrice + '원'}
            </CoTypography>
          </Grid>
        </Grid>
        <Grid mb="1rem">
          <Button onClick={openPaymentWidget} variant="contained" fullWidth>
            결제하기
          </Button>
        </Grid>
        <Grid>
          <CoTypography sx={{ fontSize: "0.625rem", color: "#7d7d7d" }}>
            회원 본인은 주문내용을 확인했으며,
            <br />
            <span style={{ textDecoration: "underline" }}>
              구매조건 및 개인정보처리방침
            </span>
            과 결제에 동의합니다.
          </CoTypography>
        </Grid>
      </Grid>
    </>
  );
};

export default CartPayment;
