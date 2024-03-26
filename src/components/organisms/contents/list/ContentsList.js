
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import ContantsListItem from "./ContentsListItem";
import { contentsListApi } from "../../../api/contentsListApi";
import { useNavigate } from "react-router-dom";


// grid style
const GridStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2)
}));

const ContentsList = () => {

  const navi = useNavigate();

  const goDetail = () => {
    navi('/detail')
  }

  return (
    <GridStyle container spacing={3.75}>
      {contentsListApi.map((product) => (
        <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}  onClick={goDetail}>
          <ContantsListItem key={product.id} product={product} />
        </Grid>
      ))}
    </GridStyle>
  );
};

export default ContentsList;
