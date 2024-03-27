import { useTheme } from '@emotion/react';
import { Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CoTypography from '../../../../atoms/common/CoTypography';

const ContentsSideHeader = () => {

	const theme = useTheme();

	const [activeComponent, setActiveComponent] = useState('list');

  const [isReplyHover, setIsReplyHover] = useState(false);

  const handleReplyClick = () => {
    console.log('리플리 클릭');
    setActiveComponent('reply');
  };

  const handleVideoListClick = () => {
    console.log('리스트 클릭');
    setActiveComponent('list');
  };

  return (
		
		<Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `1px solid ${theme.palette.divider}`}}>

			<Grid container sx={{ px: 2, py: 0.3, paddingTop: 1, display: 'flex' }}>
				{activeComponent === 'reply' ? (
				///////////////////// 1
				<>
				<Grid item xs={3} onClick={handleReplyClick}>
					<CoTypography 
						size='Content' 
						sx={{
							color: isReplyHover ? 'text.primary' : 'primary.main', 
							':hover': {
								color: 'primary.main', 
								cursor: 'pointer'
							}
						}}
					>Reply
					</CoTypography>
				</Grid>
				<Grid 
					item xs={9} 
					onClick={handleVideoListClick} 
					onMouseEnter={() => setIsReplyHover(true)} 
					onMouseLeave={() => setIsReplyHover(false)}
					sx={{ 
						display: 'flex', 
						flexDirection: 'column', 
						justifyContent: 'flex-end',
						color: "#6E6E6E"
					}}
				>
					<Typography variant="body2" sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>List</Typography>
				</Grid>
				</>
				) : (
				///////////////////// 2
				<>
				<Grid item xs={3} onClick={handleVideoListClick}>
					<CoTypography 
						size='Content' 
						sx={{
							color: isReplyHover ? 'text.primary' : 'primary.main', 
							':hover': {
								color: 'primary.main', 
								cursor: 'pointer'
							}
						}}
					>List
					</CoTypography>
				</Grid>
				<Grid 
					item xs={9} 
					onClick={handleReplyClick} 
					onMouseEnter={() => setIsReplyHover(true)} 
					onMouseLeave={() => setIsReplyHover(false)}
					sx={{ 
						display: 'flex', 
						flexDirection: 'column', 
						justifyContent: 'flex-end',
						color: "#6E6E6E"
					}}
				>
					<Typography variant="body2" sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>Reply</Typography>
				</Grid>
				</>
				)}
			</Grid>
			<Divider style={{width: '70%'}}/>
		</Grid>
  )
}

export default ContentsSideHeader