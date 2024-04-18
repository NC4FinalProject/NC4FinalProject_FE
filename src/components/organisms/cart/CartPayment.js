import { Button, Grid, TextField } from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import CoTypography from "../../atoms/common/CoTypography";
import {useNavigate} from 'react-router-dom';

const CartPayment = ({totalPrice, selectedItem, userNickname, userEmail, myPoint}) => {
  const navi = useNavigate();
  const [usePoint, setUsePoint] = useState("");
  const [payPrice, setPayPrice] = useState(0);

  const openPaymentWidget = useCallback(async () => {
    sessionStorage.setItem("totalPrice", payPrice);
    sessionStorage.setItem("usePoint", usePoint);

    if(selectedItem.length <= 0) {
      alert("결제할 강의를 먼저 선택하세요.");
      return;
    }

    if(payPrice <= 0) {
      navi("/payment/success");
      return;
    }

    navi("/paymentWidget", {state: {selectedItem: selectedItem, userNickname: userNickname, userEmail: userEmail, totalPrice: payPrice}})
  }, [selectedItem, payPrice, usePoint]);

  const changeUsePoint = (e) => {
    if(Number(e.target.value) > myPoint) {
      alert("보유포인트보다 더 큰 포인트를 입력하셨습니다.");
      setUsePoint("");
      return;
    }
    setUsePoint(e.target.value);
  };

  useEffect(() => {
    setPayPrice(totalPrice - usePoint);
  }, [totalPrice, usePoint]);
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
              결제금액
            </CoTypography>
          </Grid>
          <Grid>
            <CoTypography size="Tag" style={{ color: "black" }}>
              {totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원'}
            </CoTypography>
          </Grid>
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Grid mb="1rem">
            <CoTypography size="Tag" style={{ color: "black" }}>
              포인트
            </CoTypography>
          </Grid>
          <Grid mb="1rem">
            <TextField size="small" 
                       variant="standard"
                       helperText={"보유포인트: " + myPoint}
                       value={usePoint}
                       onChange={changeUsePoint}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Grid mb="1rem">
            <CoTypography size="Tag" style={{ color: "black" }}>
              총 결제금액
            </CoTypography>
          </Grid>
          <Grid>
            <CoTypography size="Tag" style={{ color: "black" }}>
              {payPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원'}
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
