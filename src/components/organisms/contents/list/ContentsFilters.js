import { useState } from "react";
import styled from "@emotion/styled";
import { Autocomplete, Box, InputAdornment, MenuItem, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import {useContentsListStore} from "../../../../stores/ContentsStore";


// blogs
// import { blogList } from "../../api/blogApi";

// style
const BoxStyle = styled(Box)(({ theme }) => ({
  // root
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),

  // pop up indicator, down caret icon
  "& .MuiAutocomplete-popupIndicator": {
    display: "none",
  },

  // textfield
  "& .searchField": {
    "& .MuiInputBase-root": {
      paddingTop: 1,
      paddingBottom: 1,
    },
    "& .MuiAutocomplete-hasPopupIcon": {
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.text.secondary}`,
      borderRadius: theme.spacing(1),
    },
  },

  // select
  "& .selectFilter": {
    "& .MuiOutlinedInput-input": {
      paddingTop: 10,
      paddingBottom: 10,
    },
    "& .MuiMenu-paper": {
      marginTop: "50px !important",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.palette.text.secondary}`,
      borderRadius: theme.spacing(1),
    },

    // menu item
    "& .MuiMenuItem-root": {
      color: "pink",
    },
  },
}));

// filter
const categoryItems = [
  { id: "el0", type: "카테고리" },
  { id: "el1", type: "개발 · 프로그래밍" },
  { id: "el2", type: "게임 개발" },
  { id: "el3", type: "데이터 사이언스" },
  { id: "el4", type: "인공지능" },
  { id: "el5", type: "보안 · 네트워크" },
  { id: "el6", type: "비즈니스 · 마케팅" },
  { id: "el7", type: "하드웨어" },
  { id: "el8", type: "웹 디자인" },
];

const filterItems = [
  { id: "el1", type: "판매순" },
  { id: "el2", type: "인기순" },
  { id: "el3", type: "최신순" },
];

const priceItems = [
  { id: "el0", type: "가격" },
  { id: "el1", type: "무료" },
  { id: "el2", type: "유료" },
  { id: "el3", type: "국가" },
];

const ContentsFilters = () => {
  const [filterType, setFilterType] = useState("인기순");
  const [priceType, setPriceType] = useState("가격");
  const [categoryType, setCategoryType] = useState("카테고리");

  const {
    category,
    setCategory,
    pricePattern,
    setPricePattern,
    orderType,
    setOrderType,
    getContentsListOutput,
  } = useContentsListStore();

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setOrderType(e.target.value);
    getContentsListOutput();
  }

  const handleCategoryFilterTypeChange = (e) => {
    setCategoryType(e.target.value);
    if(e.target.value === "카테고리") {
      setCategory("");
    } else {
      setCategory(e.target.value);
    }
    getContentsListOutput();
  }

  const handlePriceTypeChange = (e) => {
    setPriceType(e.target.value);
    if(e.target.value === "가격") {
      setPricePattern("");
    } else {
      setPricePattern(e.target.value);
    }
    getContentsListOutput();
  }
  
  return (
    <BoxStyle>
      {/* auto complete */}
      {/* <Autocomplete
        id="combo"
        // options={blogList}
        getOptionLabel={(item) => item.title}
        style={{ width: 220 }}
        renderInput={(params) => (
          <TextField
            className="searchField"
            {...params}
            variant="outlined"
            placeholder="Search Post..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch />
                </InputAdornment>
              ),
            }}
          />
        )}
      /> */}

      {/* select with text field */}
      <TextField sx={{ mx: 0.5 }} 
        variant="outlined"
        id="selectTextField"
        className="selectFilter"
        select
        value={categoryType}
        onChange={handleCategoryFilterTypeChange}
      >
        {categoryItems.map((el) => (
          <MenuItem key={el.id} value={el.type} selected={el.type === category}>
            {el.type}
          </MenuItem>
        ))}
      </TextField>

      <div>

        <TextField sx={{ mx: 0.5 }} 
          variant="outlined"
          id="selectTextField"
          className="selectFilter"
          select
          value={priceType}
          onChange={handlePriceTypeChange}
        >
          {priceItems.map((el) => (
            <MenuItem key={el.id} value={el.type} selected={el.type === pricePattern}>
              {el.type}
            </MenuItem>
          ))}
        </TextField>

        <TextField sx={{ mx: 1 }} 
          variant="outlined"
          id="selectTextField"
          className="selectFilter"
          select
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          {filterItems.map((el) => (
            <MenuItem key={el.id} value={el.type} selected={el.type === orderType}>
              {el.type}
            </MenuItem>
          ))}
        </TextField>

      </div>

    </BoxStyle>
  );
};

export default ContentsFilters;
