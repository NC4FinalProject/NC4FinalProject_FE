
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import ContentsListItem from "./ContentsListItem";
import { contentsListApi } from "../../../api/contentsListApi";
import { useNavigate } from "react-router-dom";
import ContentsCard from "../../common/ContentsCard";


// grid style
const GridStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2)
}));

const ContentsList = () => {

  const navi = useNavigate();

  // const goDetail = (contentsId) => {
  //   // navi('/detail')
  //   console.log(contentsId);
  // }

  const goDetail = (contentsId) => {
    return () => {
      navi(`/detail/${contentsId}`);
      console.log(contentsId);
    };
  };

  return (
    <GridStyle container spacing={3.75}>
      {contentsListApi.map((contents) => (
        <Grid key={contents.id} item xs={6} sm={6} md={4} lg={3} onClick={goDetail(contents.id)} style={{ cursor: 'pointer' }}>
          <ContentsListItem contents={contents} />
        </Grid>
      ))}
      <ContentsCard/>

      {/* <Grid key={contentsListApi[1].id} item xs={6} sm={6} md={4} lg={3} >
        <ContentsListItem contents={contentsListApi[1]} />
      </Grid> */}
      
      ??
    </GridStyle>
  );
};

export default ContentsList;
