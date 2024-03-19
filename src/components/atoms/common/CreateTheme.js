import { createTheme } from '@mui/material/styles';
import PretendardRegular from './Pretendard-Medium.ttf';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard',
  },
  overrides: {
    '@font-face': [
      {
        fontFamily: 'Pretendard',
        src: `url(${PretendardRegular})`,
      },
    ],
  },
});

export default theme;