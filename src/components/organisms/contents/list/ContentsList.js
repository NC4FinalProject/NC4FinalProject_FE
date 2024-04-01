
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import ContentsListItem from "./ContentsListItem";
import { contentsListApi } from "../../../api/contentsListApi";
import { useNavigate } from "react-router-dom";
import LectureCard from "../../common/LectureCard";


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
      {/* {contentsListApi.map((contents) => (
        <Grid key={contents.id} item xs={6} sm={6} md={4} lg={3}  onClick={goDetail}>
          <ContentsListItem key={contents.id} contents={contents} />
        </Grid>
      ))} */}
      <LectureCard/>

      <Grid key={contentsListApi[1].id} item xs={6} sm={6} md={4} lg={3} >
        <ContentsListItem contents={contentsListApi[1]} />
      </Grid>
      
      ??
    </GridStyle>
  );
};

export default ContentsList;
