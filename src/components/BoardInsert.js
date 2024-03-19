import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import '../scss/BoardInsert.scss';
import useBoardStore from '../stores/boardStore';

const BoardInsert = () => {
    const { addBoard } = useBoardStore();

    const [text, setText] = useState('');

    const handleChange = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!text.trim()) return;
            addBoard(text);
            setText('');
        },
        [addBoard, text]
    );

    return (
        <form className="BoardInsert" onSubmit={handleSubmit}>
            <input placeholder="제목을 입력하세요" value={text} onChange={handleChange} />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default BoardInsert;
