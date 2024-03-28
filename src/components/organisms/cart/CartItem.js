import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import React from "react";
import CoTypography from "../../atoms/common/CoTypography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const CartItem = ({ itemImg, itemName, teacherName, price }) => {
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
            control={<Checkbox />}
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
              src={itemImg}
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
          <CloseOutlinedIcon style={{ verticalAlign: "middle" }} />
        </Grid>
        <Grid item xs={2} display="flex" justifyContent={"flex-end"}>
          {price && (
            <CoTypography size="Content" fontWeight="bold">
              {price.toLocaleString()}원
            </CoTypography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CartItem;
