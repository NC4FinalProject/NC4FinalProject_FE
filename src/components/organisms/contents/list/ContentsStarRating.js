import { Box, Rating } from "@mui/material";

const ContentsStarRating = ({
  sx,
  onChange,
  size,
  readOnly = false,
  rating,
}) => {
  const handleRatingChange = (event, newValue) => {
    // 별점 값은 최소 1점이상
    const finalValue = newValue < 1 ? 1 : newValue;
    if (onChange) {
      onChange(finalValue);
    }
  };

  return (
    <Box sx={{ ...sx }}>
      <Rating
        defaultValue={5}
        name="simple-controlled"
        value={rating}
        onChange={handleRatingChange}
        precision={0.5}
        size={size}
        readOnly={readOnly}
      />
    </Box>
  );
};

export default ContentsStarRating;
