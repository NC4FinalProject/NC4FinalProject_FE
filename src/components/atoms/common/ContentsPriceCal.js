import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";


// style
// const TextStyle = styled(Typography)(({ theme }) => ({
//   fontSize: 14,
//   "& .disabledText": {
//     fontSize: 12,
//     color: theme.palette.text.secondary,
//     marginRight: theme.spacing(0.5),
//     textDecoration: "line-through",
//   },
// }));

// const ProductPrice = ({ price, priceSale }) => {
//   return (
//     <TextStyle variant="subtitle2">
//       {priceSale && (
//         <span className="disabledText">{priceSale.toFixed(2)}원</span>
//       )}

//       <span>{price.toFixed(2)}원</span>
//     </TextStyle>
//   );
// };

const formatPrice = (price) => {
  // 입력값을 숫자로 변환 시도
  // const numericPrice = parseFloat(price);
  // 숫자로 정상적으로 변환되었는지 확인하고, 아니면 0으로 처리
  return (
    typeof price === 'number' ?
    new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price).slice(1, 10) + "원" :
    price // "₩"와 소수점을 제거
  );
};

const ContentsPriceCal = ({ price, priceSale }) => {
  return (
    // <TextStyle variant="subtitle2">
    <>
      {priceSale && (
        // <span className="disabledText">{formatPrice(priceSale)}원</span>
        <>
          {formatPrice(priceSale)}원
        </>
      )}
      {/* <span>{formatPrice(price)}</span> */}
      <>{formatPrice(price)}</>
    </>
    
    // </TextStyle>
  );
};

export default ContentsPriceCal;
