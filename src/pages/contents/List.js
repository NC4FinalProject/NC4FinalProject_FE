import styled from '@emotion/styled';
import { Box, Button, Container, Pagination, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import ContentsList from '../../components/organisms/contents/list/ContentsList';
import ContentsFilters from '../../components/organisms/contents/list/ContentsFilters';
import { useContentsListStore } from '../../stores/ContentsStore';

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
  padding: 0,
  paddingTop: theme.spacing(2),

  // product header
  // h3
  "& .productHeader": {
    fontSize: 30,
    fontWeight: 500,
  },
}));


const List = () => {

  const { getContentsList, getContentsListOutput } = useContentsListStore();

  // 마운트 시, 로그인
  useEffect(() => {
    getContentsListOutput();
  }, []);



  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Products | MUI Dash</title>
      </Helmet>

      <ContainerStyle maxWidth="1300px">

        <ContentsFilters />

        {/* Contents List */}
        <ContentsList />

        {/* Contents Paging */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}>
          <Pagination count={10} />
        </Box>
        
      </ContainerStyle>
      
    </>
  );
}

export default List