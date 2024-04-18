import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const QnaSelect = ({ onChange,value, options, sx }) => {

  return (
    <Box sx={{ width:'100%'}}>
      <FormControl fullWidth>
        <InputLabel id="qna-reasons">문의 카테고리</InputLabel>
        <Select
          labelId="qna-reasons"
          value={value}
          label="문의 카테고리"
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

export default QnaSelect;
