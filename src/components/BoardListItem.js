import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox, MdRemoveCircleOutline } from 'react-icons/md';
import '../scss/BoardListItem.scss';
import useBoardStore from '../stores/boardStore';
import cn from 'classnames';

const BoardListItem = ({ board }) => {
    const { changeBoard, removeBoard } = useBoardStore();

    const { id, boardTitle, checked } = board;

    return (
        <div className="BoardListItem">
            <div className={cn('checkbox', { checked })} onClick={() => changeBoard({ ...board })}>
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="text">{boardTitle}</div>
            </div>
            <div className="remove" onClick={() => removeBoard(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default BoardListItem;
