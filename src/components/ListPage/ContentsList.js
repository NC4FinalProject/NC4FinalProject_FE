
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import ContantsListItem from "./ContentsListItem";
import { contents } from "../api/contentsApi";


// grid style
const GridStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2)
}));

const ContentsList = () => {
  return (
    <GridStyle container spacing={3.75}>
      {contents.map((product) => (
        <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}>
          <ContantsListItem key={product.id} product={product} />
        </Grid>
      ))}
    </GridStyle>
  );
};

export default ContentsList;
