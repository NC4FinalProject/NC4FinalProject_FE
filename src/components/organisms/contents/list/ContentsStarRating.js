import { Box, Rating } from "@mui/material";
import { useState } from "react";

const ContentsStarRating = ({ sx, onChange }) => {
  const [value, setValue] = useState(1); // 초기 별점 값 설정

  const handleRatingChange = (event, newValue) => {
    // 별점 값은 최소 1점이상
    const finalValue = newValue < 1 ? 1 : newValue;
    setValue(finalValue);
    if (onChange) {
      onChange(finalValue);
    }
  };

  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
        precision={0.5}
      />
    </Box>
  );
};

export default ContentsStarRating;
