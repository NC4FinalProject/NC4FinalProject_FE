import { Box, Rating } from "@mui/material";
import { useState } from "react";

const ContentsStarRating = () => {
  const [value, setValue] = useState(5); // 초기 별점 값 설정

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          fontSize: '1rem', // 별의 크기를 조절합니다. 더 작게 만들고 싶다면 값을 줄이세요.
        }}
        precision={0.1} // 별점의 정밀도를 0.5로 설정 (반 별 허용)
      />
    </Box>
  );
};

export default ContentsStarRating;