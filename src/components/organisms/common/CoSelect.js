import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CoSelect = ({ onChange,value, options, sx }) => {
  const [reportReasons, setReportReasons] = useState([
    "욕설 및 혐오 발언",
    "스팸 및 불법 홍보",
    "도배 및 중복 콘텐츠",
    "기타",
  ]);

  return (
    <Box sx={{ width:'100%'}}>
      <FormControl fullWidth>
        <InputLabel id="report-reasons">신고 사유</InputLabel>
        <Select
          labelId="report-reasons"
          value={value}
          label="신고 사유"
          onChange={onChange}
          sx={{sx}}
        >
          {options.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CoSelect;
