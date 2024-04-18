import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CoTypography from "../../atoms/common/CoTypography";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CartItem from "./CartItem";
import CartPayment from "./CartPayment";
import CartUserInformation from "./CartUserInformation";
import axios from "axios";
import MemberStore from "../../../stores/MemberStore";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const {memberInfo} = MemberStore();
  const [selectedItem, setSelectedItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedCnt, setCheckedCnt] = useState(0);
  const [myPoint, setMyPoint] = useState(0);

  const getCart = useCallback(async () => {
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/cart/cart`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
      console.log(response);
      console.log(response.data.item.cartContentsList);
      setCartItem(response.data.item.cartContentsList);
      setMyPoint(response.data.item.myPoint);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getCart();
  }, []);

  const changeSelectItem = useCallback((item, checked) => {
    if(checked) {
      setSelectedItem([...selectedItem, item]);
    } else {
      setSelectedItem(selectedItem.filter(sItem => sItem.contentsId !== item.contentsId));
    }
  }, [selectedItem, setSelectedItem]);

  useEffect(() => {
    if(selectedItem.length !== 0) {
      sessionStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    } else {
      sessionStorage.removeItem("selectedItem");
    }
  }, [selectedItem]);

  useEffect(() => {
    if(selectedItem) {
      setTotalPrice(selectedItem.reduce((sum, cItem) => parseInt(sum) + parseInt(cItem.price), 0))
    }
    setCheckedCnt(selectedItem.length);
  }, [selectedItem]);

  const deleteSelectedItem = useCallback(async () => {
    const deleteItem = selectedItem.map(item => ({
      cartId: item.cartId,
      contentsId: item.contentsId
    }));

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_BACK_URL}/cart/delete`,
        deleteItem,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          }
        }
      );
      console.log(response);
      setCartItem(response.data.item.cartContentsList);
      setSelectedItem([]);
    } catch(e) {
      console.log(e);
    }
  }, [selectedItem]);

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
                  <CoTypography size="NavTab">
                    선택된 강의 {checkedCnt} / {cartItem && cartItem.length}
                  </CoTypography>
              </Grid>
              <Grid>
                <CoHoverButton
                  variant="outlined"
                  style={{ padding: "5px 8px 5px 10px" }}
                  onClick={deleteSelectedItem}
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
          {cartItem.length !== 0 ? cartItem.map((item) => (
            <CartItem
              key={item.contentsId}
              itemImg={item.thumbnail}
              itemName={item.contentsTitle}
              teacherName={item.author}
              price={item.price}
              item={item}
              setCartItem={setCartItem}
              changeSelectItem={changeSelectItem}
            />
          )) : <div>장바구니에 담긴 강의가 없습니다.</div>}
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
            key={memberInfo && memberInfo.memberId}
            userNickname={memberInfo && memberInfo.userNickname}
            userEmail={memberInfo && memberInfo.username}
          />
          <CartPayment 
            totalPrice={totalPrice}
            selectedItem={selectedItem}
            userNickname={memberInfo && memberInfo.userNickname}
            userEmail={memberInfo && memberInfo.username}
            myPoint={myPoint}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
