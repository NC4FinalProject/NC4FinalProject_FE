import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import React, { useEffect } from "react";
import CoTypography from "../../atoms/common/CoTypography";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CartItem from "./CartItem";
import CartPayment from "./CartPayment";
import CartUserInformation from "./CartUserInformation";

const lectureItems = [
  {
    itemId: 1,
    itemImg: "https://via.placeholder.com/150x80",
    itemName: "아프니까 자바다",
    teacherName: "홍길동",
    price: 33333,
  },
  {
    itemId: 2,
    itemImg: "https://via.placeholder.com/150x80",
    itemName: "너도 할 수 있다 개발자",
    teacherName: "홍길동",
    price: 56565,
  },
  {
    itemId: 3,
    itemImg: "https://via.placeholder.com/150x80",
    itemName: "너도 할 수 있다 개발자",
    teacherName: "홍길동",
    price: 56565,
  },
  {
    itemId: 4,
    itemImg: "https://via.placeholder.com/150x80",
    itemName: "너도 할 수 있다 개발자",
    teacherName: "홍길동",
    price: 56565,
  },
  {
    itemId: 5,
    itemImg: "https://via.placeholder.com/150x80",
    itemName: "너도 할 수 있다 개발자",
    teacherName: "홍길동",
    price: 56565,
  },
  {
    itemId: 6,
    itemImg: "https://via.placeholder.com/150x80",
    itemName: "너도 할 수 있다 개발자",
    teacherName: "홍길동",
    price: 56565,
  },
  {
    itemId: 7,
    itemImg: "https://via.placeholder.com/150x80",
    itemName: "너도 할 수 있다 개발자",
    teacherName: "홍길동",
    price: 56565,
  },
  {
    itemId: 8,
    itemImg: "https://via.placeholder.com/150x80",
    itemName: "너도 할 수 있다 개발자asdfasdfasfasfd",
    teacherName: "홍길동",
    price: 56565,
  },
];

const user = [
  {
    Id: 1,
    userNickname: "그만~",
    userEmail: "aaa@naver.com",
    userPhone: "01012345678",
  },
];

const Cart = () => {
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
          {lectureItems.map((item) => (
            <CartItem
              key={item.itemId}
              itemImg={item.itemImg}
              itemName={item.itemName}
              teacherName={item.teacherName}
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
          {user.map((user) => (
            <CartUserInformation
              key={user.Id}
              userNickname={user.userNickname}
              userEmail={user.userEmail}
              userPhone={user.userPhone}
            />
          ))}
          <CartPayment />
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
