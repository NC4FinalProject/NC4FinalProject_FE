import React, { useEffect } from 'react';
import BoardListItem from './BoardListItem';
import useBoardStore from '../stores/boardStore';

const BoardList = () => {
    const { boards, getBoards } = useBoardStore();

    useEffect(() => {
        getBoards();
    }, []);

    return (
        <div className="BoardList">
            {boards &&
                boards.map((board) => <BoardListItem key={board.id} board={board}></BoardListItem>)}
        </div>
    );
};

export default BoardList;
