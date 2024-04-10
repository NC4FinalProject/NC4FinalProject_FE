import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import ContentsPriceCal from "../../../../atoms/common/ContentsPriceCal";
import { useNavigate } from "react-router-dom";
import { useContentsStore } from "../../../../../stores/ContentsStore";
import axios from "axios";

const ContentsPrice = ({ contentsId }) => {
  /////////////////////////////////////////////////
  // 무료일 경우 0 을 받고 FREE 라는 텍스트를 반환 -> 결국 값이 0일 경우에만 FREE 아닐 경우 가격 표시 0
  // 실시간 일 경우 음수를 받아와 국비지원 인 것을 알아야 할듯? -1
  // 유료일 경우 컨텐츠로 부터 가격 데이터를 받아옴 가격 > 0
  const { fetchContents, getContents, getVideo, getSection } =
    useContentsStore();

  /////////////////컨텐츠 번호 가져와서 플라이스 컴포넌트에 전달/////////////////
  const [priceState, setPriceState] = useState("");

  const [contentsType, setContentsType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let price = getContents.price;
    if (price == 0) {
      setPriceState("무료강의");
      console.log("1");
    } else if (price > 0) {
      setPriceState(price);
      console.log("2");
    } else if (price < 0) {
      setPriceState("국비지원");
      console.log("3");
    }
    if (getVideo.length === 1) {
      setContentsType("단일 강의");
    } else setContentsType("다중 강의");
  }, [getContents.price, getVideo]);
  /////////////////////////////////////////////////

  // 컨텐츠 자체 별점 정보 가져올 것
  const value = 4.2;

  const addCart = useCallback(async () => {
    try {
      const response = await axios.post(
        `http://localhost:9090/cart/add`,
        { contentsId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );

      // console.log(response);
      if (response.data.item.cartId) {
        alert("장바구니에 추가되었습니다.");
        navigate("/cart");
      }
    } catch (e) {
      console.log(e);
      if (e.response.data.errorCode === 4001) {
        alert("이미 장바구니에 있는 강의입니다.");
      } else {
        alert("에러 발생. 관리자에게 문의하세요.");
      }
    }
  }, [contentsId]);

  return (
    <Grid container direction="column">
      {/* 첫 번째 그리드 - 사이드 정렬 */}
      <Grid container paddingX={"1rem"}>
        <Grid item xs={7} sx={{ textAlign: "left" }}>
          <Typography
            variant="h5"
            sx={{ color: "#1C1C1C", letterSpacing: "-1px" }}
          >
            <ContentsPriceCal price={priceState} />
          </Typography>
        </Grid>

        <Grid item xs={5} sx={{ textAlign: "right", alignContent: "center" }}>
          <Box>
            <Rating
              value={value}
              size="small"
              name="read-only"
              precision={0.5}
              readOnly
              sx={{
                "& .MuiRating-iconFilled": {
                  marginRight: "-2px", // 기본 마진 감소
                },
                "& .MuiRating-iconEmpty": {
                  marginRight: "-2px", // 기본 마진 감소
                },
              }}
            />
          </Box>
          <Box sx={{ textAlign: "right", marginTop: "-7%", color: "#6E6E6E" }}>
            <Typography variant="caption">(315)</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* 두 번째 그리드 - 중앙 정렬 */}
      <Grid item sx={{ padding: "1rem" }}>
        <Button fullWidth variant="outlined" onClick={() => addCart()}>
          수강신청
        </Button>
      </Grid>

      {/* 세 번째 그리드 - 좌측 정렬 */}
      <Grid container item sx={{ color: "#6E6E6E", paddingX: "1rem" }}>
        <Grid container item xs={8} direction="column">
          <Typography>· {contentsType}</Typography>
          <Typography>· 챕터 {getSection.length}개 · 59:13</Typography>
          <Typography>· 난이도 : 입문</Typography>
        </Grid>

        <Grid container item xs={4} justifyContent={"flex-end"}>
          <FaCartPlus
            onClick={() => {
              navigate("/cart");
            }}
            style={{
              marginRight: "0.3em",
              color: "#6E6E6E",
              cursor: "pointer",
              fontSize: "20px",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContentsPrice;
