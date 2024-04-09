import { create } from 'zustand';
import axios from 'axios';

const useBoardStore = create((set) => ({
    boards: [],

    getBoards: async () => {
        try {
            const accessToken = sessionStorage.getItem('ACCESS_TOKEN');
            if (!accessToken) {
                alert('로그인이 필요합니다.');
                window.location.href = '/login';
                return;
            }

            const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/board/board`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Response:', response.data);
            set({ boards: response.data.items });
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    },

    addBoard: async (text) => {
        try {
            const response = await axios.post(
                `http://${process.env.REACT_APP_BACK_URL}/board/board`,
                {
                    boardTitle: text,
                    checked: false,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                }
            );
            set({ boards: response.data.items });
        } catch (error) {
            console.error('Error adding board:', error);
        }
    },

    changeBoard: async (board) => {
        try {
            const response = await axios.put(
                `http://${process.env.REACT_APP_BACK_URL}/board/board`,
                { ...board, checked: !board.checked },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                }
            );
            console.log(response);
            set({ boards: response.data.items });
        } catch (error) {
            console.error('Error changing board:', error);
        }
    },

    removeBoard: async (id) => {
        try {
            const response = await axios.delete(`http://${process.env.REACT_APP_BACK_URL}/board/board`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
                params: { id: id },
            });
            set({ boards: response.data.items });
        } catch (error) {
            console.error('Error removing board:', error);
        }
    },
}));

export default useBoardStore;
