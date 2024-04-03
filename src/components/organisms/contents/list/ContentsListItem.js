import styled from "@emotion/styled";
import { Box, Card, Typography } from "@mui/material";
import ContentsStarRating from "./ContentsStarRating";
import ContentsPriceCal from "../../../atoms/common/ContentsPriceCal";


// card style
const CardStyle = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),

  // minHeight:100vh;
  // minHeight: "10vh",
  // min-height: 100vh;
  // height: '200px',

  boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 4px 8px -4px`,

  "&:hover": {
    boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
  },
}));

const ContentsListItem = (props) => {
  const { contentsTitle, price, priceSale, contentsImage, status, colors, id } = props.contents;

  // label style
  const LabelStyle = styled("label")(({ theme }) => ({
    fontWeight: 500,
    color: "white",
    backgroundColor:
      status === "sale" ? theme.palette.error.main : theme.palette.success.main,
    padding: "4px 6px", // 이놈이다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    borderRadius: theme.spacing(1),
    zIndex: 9,
    position: "absolute",
    top: theme.spacing(1.2),
    right: theme.spacing(1.2),
    textTransform: "uppercase",
  }));

  return (
    <CardStyle>

      {/* Image with Label */}
      <Box sx={{ pt: "100%", position: "relative" }}>
        {status && <LabelStyle>{status}</LabelStyle>}

        <Box
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
          }}
          component="img"
          src={contentsImage}
          alt={contentsTitle}
        />
      </Box>

      {/* bottom of the card */}
      <Box sx={{ py: 1, px: 1 }}>
        {/* <Link to="/" component={RouterLink} underline="hover" color="inherit">   */}
          <Typography variant="subtitle1" noWrap>
            {contentsTitle}
          </Typography>

        {/* </Link> */}
        개발프로그래밍 | 임꺽정

        {/* Price & Color box */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ContentsStarRating />
          {/* <ProductColorPreview colors={colors} limit={3} /> */}
          <ContentsPriceCal price={price} priceSale={priceSale} />
        </Box>
      </Box>
    </CardStyle>
  );
};

export default ContentsListItem;
