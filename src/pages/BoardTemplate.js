import React from 'react';
import '../scss/BoardTemplate.scss';
import BoardInsert from '../components/BoardInsert';
import BoardList from '../components/BoardList';

const BoardTemplate = () => {
  return (
    <div className='BoardTemplate'>
        <div className='app-title'>게시글 관리</div>
        <div className='content'>
          <BoardInsert />
          <BoardList />
        </div>
    </div>
  );
}

export default BoardTemplate;