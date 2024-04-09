import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CoTypography from "../../atoms/common/CoTypography";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CartItem from "./CartItem";
import CartPayment from "./CartPayment";
import CartUserInformation from "./CartUserInformation";
import axios from 'axios';
import MemberStore from '../../../stores/MemberStore';

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const {memberInfo} = MemberStore();

  const getCart = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/cart/cart`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          }
        }
      );

      console.log(response.data.item.cartContentsList);
      setCartItem(response.data.item.cartContentsList);
    } catch(e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Grid
        container
        style={{
          margin: "0rem 0rem 2rem 0",
        }}
      >
        <Grid item xs={9} padding="2rem">
          <Grid item xs={12}>
            <Grid pt="1rem">
              <CoTypography size="WriteTitle">장바구니</CoTypography>
            </Grid>
            <Grid
              container
              direction="row"
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end"
              width={"95%"}
              pt="2rem"
              pb="1rem"
              borderBottom="2px solid black"
            >
              <Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <CoTypography size="NavTab">
                      전체선택 {1} / {3}
                    </CoTypography>
                  }
                  sx={{
                    width: "max-content",
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
              </Grid>
              <Grid>
                <CoHoverButton
                  variant="outlined"
                  style={{ padding: "5px 8px 5px 10px" }}
                >
                  <span
                    style={{
                      position: "relative",
                      top: "0.5px",
                    }}
                  >
                    선택삭제
                  </span>
                  <CloseOutlinedIcon style={{ verticalAlign: "middle" }} />
                </CoHoverButton>
              </Grid>
            </Grid>
          </Grid>
          {cartItem && cartItem.map((item) => (
            <CartItem
              key={item.contentsId}
              itemImg={item.thumbnail}
              itemName={item.contentsTitle}
              teacherName={item.author}
              price={item.price}
            />
          ))}
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            padding: "1rem",
            position: "sticky",
            top: "10%",
            zIndex: 1,
            overflowY: "auto",
            maxHeight: "60vh",
          }}
        >
          
          <CartUserInformation
            key={memberInfo.memberId}
            userNickname={memberInfo.userNickname}
            userEmail={memberInfo.username}
          />
          <CartPayment />
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
