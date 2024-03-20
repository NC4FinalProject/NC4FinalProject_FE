import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Board from './contentsElements/Board';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ContentsDetail() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="소개" {...a11yProps(0)} />
          <Tab label="코스" {...a11yProps(1)} />
          <Tab label="후기" {...a11yProps(2)} />
          <Tab label="게시판" {...a11yProps(3)} />
        </Tabs>
      </Box>

      {/* 소개 */}
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      {/* 코스 */}
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      {/* 후기 */}
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      {/* 게시판 */}
      <CustomTabPanel value={value} index={3}>
        <Board></Board>
      </CustomTabPanel>
      
    </Box>
  );
}


// export default ContentsDetail;