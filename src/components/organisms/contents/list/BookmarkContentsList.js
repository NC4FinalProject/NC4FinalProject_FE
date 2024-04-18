import { Box } from "@mui/material";
import ContentsCard from "../../common/ContentsCard";
import { useBookmarkContentsListStore } from "../../../../stores/ContentsStore";
import { useEffect } from "react";

const BookmarkContentsList = () => {

  const { getBookmarkContentsList, getBookmarkContentsListOutput } = useBookmarkContentsListStore();

  useEffect(() => {
    getBookmarkContentsListOutput();
  }, []);

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', width:'1300px'}}>
      {getBookmarkContentsList.content && getBookmarkContentsList.content.map((contents, index) => (
        <ContentsCard key={index} {...contents} index={index} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} 
         />
      ))}
    </Box>
  );
};

export default BookmarkContentsList;




  // const lectures = [
  //   { id: 1, title: '국민 내일 배움카드', category: '프론트앤드', author: '손우성', rating: 4, reviews: 300, booked: true, img: 'https://greenart.co.kr/upimage/comm/20240227134333.webp' },
  //   { id: 2, title: '프론트 자바스크립 1시간만에 마스터하기', category: '프론트앤드', author: '정재호', rating: 4, reviews: 300, booked: true, img: 'https://www.bitcamp.co.kr/data/file/class/thumb-3731540291_fd46qzJH_7b2d735a24874b5aed27d7731e797a505be5c2e4_380x200.png' },
  //   { id: 3, title: '프론트 뷰 1시간만에 마스터하기', category: '프론트앤드', author: '김시원', rating: 4, reviews: 300, booked: true, img: 'https://www.bitcamp.co.kr/data/file/class/thumb-3731540291_3ksrC6ZO_3cbfbf024380892ff95d9f3d9a0dbba8c28d62c3_380x200.png'},
  //   { id: 4, title: '자바스프링 1시간만에 마스터하기', category: '프론트앤드', author: '이무호', rating: 4, reviews: 300, booked: true, img: 'https://cdn.inflearn.com/public/courses/333218/cover/14d95c81-9cbf-4281-8faa-23e2a552279a/333218.jpg'},
  //   { id: 5, title: '[N캠프] 클라우드 기반 웹 개발자 & 데브옵스 과정_13기', category: '프론트앤드', author: '손무성', rating: 4, reviews: 300, booked: true, img: 'https://cdn.inflearn.com/public/courses/326485/cover/830bce1a-023d-45ff-a0d1-883bc9074b9a/326485-eng.png'},
  //   { id: 6, title: '한입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지', category: '프론트앤드', author: '정시호', rating: 4, reviews: 300, booked: true, img: 'https://cdn.inflearn.com/public/courses/332506/cover/c58f00a0-181d-4b2e-a058-6c98a7dca47a/332506-eng.png'},
  //   { id: 7, title: '프로그래밍 시작하기:웹 입문(Inflearn Original)', category: '프론트앤드', author: '김우원', rating: 4, reviews: 300, booked: true, img: 'https://cdn.inflearn.com/public/courses/328340/cover/13465c65-a83b-4bc1-82b3-71832345759d/328340-eng.png'},
  //   { id: 8, title: '프론트 리액트 1시간만에 마스터하기', category: '프론트앤드', author: '정우원', rating: 4, reviews: 300, booked: true, img: 'https://www.bitcamp.co.kr/data/editor/2402/thumb-20240215153249_919f4464e3ef68c659bf087dbeb188af_r69m_600x600.png' }
  // ];