import create from 'zustand';
import axios from 'axios';

const useStore = create((set, get) => ({
    notices: [],
    openDialog: false,
    title: '',
    content: '',
    userNickname: '',
    searchCondition: 'all',
    searchKeyword: '',
    page: 1,
    setNotices: (notices) => set({ notices }),
    setOpenDialog: (openDialog) => set({ openDialog }),
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setUserNickname: (userNickname) => set({ userNickname }),
    setSearchCondition: (searchCondition) => set({ searchCondition }),
    setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
    setPage: (page) => set({ page }),
    fetchNotices: async () => {
      const { searchCondition, searchKeyword, page, setNotices } = get();
      try {
        const response = await axios.get('http://localhost:9090/notice/notice-list', {
          params: {
            searchCondition,
            searchKeyword,
            page: page - 1,
          },
        });
        setNotices(response.data.pageItems.content);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    },
    fetchUserNickname: async () => {
      const { setUserNickname } = get();
      try {
        const response = await axios.get('http://localhost:9090/mypage', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          },
        });
        setUserNickname(response.data.item.userNickname);
      } catch (error) {
        console.warn('사용자 닉네임 가져오기 실패', error);
      }
    },
    handleNoticeSubmit: async () => {
      const { title, content, userNickname, fetchNotices, setOpenDialog, setTitle, setContent } = get();
      try {
        const noticeData = {
          noticeTitle: title,
          noticeContent: content,
          noticeWriter: userNickname,
        };
  
        await axios.post('http://localhost:9090/notice/notice', noticeData);
  
        fetchNotices();
  
        setOpenDialog(false);
        alert('공지사항이 등록되었습니다.');
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('Error adding notice:', error);
      }
    },
  }));




export default useStore;