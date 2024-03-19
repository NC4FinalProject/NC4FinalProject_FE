import React from 'react';
import '../scss/BoardTemplate.scss';

const BoardTemplate = ({children}) => {
  return (
    <div className='BoardTemplate'>
        <div className='app-title'>게시글 관리</div>
        <div className='content'>{children}</div>
    </div>
  );
}

export default BoardTemplate;