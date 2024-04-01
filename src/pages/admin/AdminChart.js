import { Typography } from '@mui/material';
import React from 'react';
import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminChart = ({ data, disable }) => {
  const tickFormatX = (date) => date;
  const tickFormatY = (num) => num.toString();
  const renderLegendText = (value) => <span>{value}</span>;

  const chartStyle = { fontSize: '0.825rem', fontFamily: 'Pretendard'};
  const USER_CHART_LEGEND_FLUCTUATION_DICTIONARY = {
    가입: { color: '#558BCF', label: '가입', fontSize: '0.725rem' },
    탈퇴: { color: '#f44336', label: '탈퇴', fontSize: '0.725rem' },
    '총 회원수': { color: '#ffc658', label: '총 회원수', fontSize: '0.725rem'},
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          left: -25,
          right: -10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          style={chartStyle}
          tickLine={false}
          axisLine={false}
          tickFormatter={tickFormatX}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          style={chartStyle}
          tickLine={false}
          axisLine={false}
          tickFormatter={tickFormatY}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          style={chartStyle}
          tickLine={false}
          axisLine={false}
          tickFormatter={tickFormatY}
        />
        <Tooltip />
        <Legend verticalAlign="bottom" align="center" wrapperStyle={{fontSize:'0.725rem', paddingBottom:'1rem'}} iconType='line' />
        <CartesianGrid stroke="#f5f5f5" />
        {!disable.includes('가입') && (
          <Bar
            yAxisId="left"
            dataKey="create"
            name={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['가입'].label}
            barSize={20}
            fill={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['가입'].color}
            fontSize={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['가입'].fontSize}
          />
        )}
        {!disable.includes('탈퇴') && (
          <Bar
            yAxisId="left"
            dataKey="delete"
            name={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['탈퇴'].label}
            barSize={20}
            fill={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['탈퇴'].color}
            fontSize={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['탈퇴'].fontSize}
          />
        )}
        {!disable.includes('총 회원수') && (
          <Line
            yAxisId="right"
            dataKey="clientTotal"
            name={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['총 회원수'].label}
            stroke={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['총 회원수'].color}
            fontSize={USER_CHART_LEGEND_FLUCTUATION_DICTIONARY['총 회원수'].fontSize}
            dot={false}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AdminChart;
