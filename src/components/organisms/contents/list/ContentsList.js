
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import ContentsListItem from "./ContentsListItem";
import { contentsListApi } from "../../../../api/contentsListApi";
import { useNavigate } from "react-router-dom";
import ContentsCard from "../../common/ContentsCard";
import { getContentsIdApi } from "../../../../api/ContentsApi";
import { useContentsStore } from "../../../../stores/ContentsStore";


// grid style
const GridStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2)
}));

const ContentsList = () => {

  const { getContentsOne, getContentsOneOutput } = useContentsStore();

  const navi = useNavigate();

  // const goDetail = (contentsId) => {
  //   // navi('/detail')
  //   console.log(contentsId);
  // }

  const getContentsId = (contentsId) => {
    return () => {
      getContentsOneOutput(contentsId); // 필요한 로직으로 활성화
      navi('/detail')
      console.log("마 버튼은 눌리나?" + contentsId);
      console.log("받아온 데이터 구조 함 보까?"+getContentsOne)
    };
  };

  return (
    <GridStyle container spacing={3.75}>
      {contentsListApi.map((contents) => (
        <Grid key={contents.id} item xs={6} sm={6} md={4} lg={3} onClick={getContentsId(contents.id)} style={{ cursor: 'pointer' }}>
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
