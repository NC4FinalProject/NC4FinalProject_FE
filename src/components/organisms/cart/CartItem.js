import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import React, { useCallback } from "react";
import CoTypography from "../../atoms/common/CoTypography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axios from 'axios';

const CartItem = ({ itemImg, itemName, teacherName, price, setCartItem, item, changeSelectItem }) => {
  const onCheckBoxClick = useCallback((e) => {
    changeSelectItem(item, e.target.checked);
  }, [changeSelectItem]);

  const deleteOne = useCallback(async() => {
    try {
      const response = await axios.delete(
        `http://${process.env.REACT_APP_BACK_URL}/cart/deleteOne/${item.cartId}`,
        {
          headers:
            {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
            },
            params: {
              contentsId: item.contentsId
            }
        }
      );

      setCartItem(response.data.item.cartContentsList);
      changeSelectItem(item, false);
    } catch(e) {
      console.log(e);
    }
  }, [item]);
  
  return (
    <>
      <Grid
        container
        item
        xs={12}
        alignItems={"flex-start"}
        width={"95%"}
        borderBottom="1px solid #868e96"
        pt="1rem"
        pb="2rem"
      >
        <Grid item xs={0.5}>
          <FormControlLabel
            control={<Checkbox onClick={onCheckBoxClick}/>}
            sx={{
              width: "max-content",
              "& .MuiSvgIcon-root": { fontSize: 28 },
              mt: "-0.6rem",
            }}
          />
        </Grid>
        <Grid item xs={2.5} sx={{ marginLeft: "0.5rem" }}>
          {itemImg && (
            <img
              src={`https://kr.object.ncloudstorage.com/envdev/${itemImg}`}
              alt="itemImg"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "4px",
              }}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Grid sx={{ marginLeft: "1rem" }}>
            <CoTypography size="Content">{itemName}</CoTypography>
          </Grid>
          <Grid sx={{ marginLeft: "1rem" }}>
            <CoTypography size="TableContent">{teacherName}</CoTypography>
          </Grid>
        </Grid>
        <Grid item xs={0.75}>
          <CloseOutlinedIcon onClick={deleteOne} style={{ cursor: 'pointer', verticalAlign: "middle" }} />
        </Grid>
        <Grid item xs={2} display="flex" justifyContent={"flex-end"}>
          {price && (
            <CoTypography size="Content" fontWeight="bold">
              {price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
            </CoTypography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CartItem;
