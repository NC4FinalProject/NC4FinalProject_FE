import React from 'react';
import BoardInsert from './components/BoardInsert';
import BoardTemplate from './pages/BoardTemplate';
import BoardList from './components/BoardList';

function App() {
    return (
        <BoardTemplate>
            <BoardInsert></BoardInsert>
            <BoardList></BoardList>
        </BoardTemplate>
    );
}

export default App;
