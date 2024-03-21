import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CoSelect = ({ value, onChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="reasonSelectLabel">신고사유</InputLabel>
        <Select
          labelId="reasonSelectLabel"
          id="reasonSelect"
          value={value}
          label="Reason"
          onChange={onChange}
          required
        >
          <MenuItem value={1}>욕설 및 혐오 발언</MenuItem>
          <MenuItem value={2}>스팸 및 불법 홍보</MenuItem>
          <MenuItem value={3}>도배 및 중복 콘텐츠</MenuItem>
          <MenuItem value={4}>기타</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CoSelect;
