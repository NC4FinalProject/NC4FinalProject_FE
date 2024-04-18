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
    page: 0,
    profileImage: null,
    files: [],
    fileDTOList: [],
    modifyFileList: [],
    likeCnt: 0,
    liked: 0,
    notice: {},
    setLikeCheck: (liked) => set({ liked }),
    setLikeCnt: (likeCnt) => set({ likeCnt }),
    setFiles: (files) => set({ files }),
    setNotices: (notices) => set({ notices }),
    setOpenDialog: (openDialog) => set({ openDialog }),
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setUserNickname: (userNickname) => set({ userNickname }),
    setSearchCondition: (searchCondition) => set({ searchCondition }),
    setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
    setPage: (page) => set({ page }),
    setPorfileImage: (profileImage) => set({ profileImage }),
    setFileDTOList: (fileDTOList) => set({ fileDTOList }),
    setModifyFileList: (modifyFileList) => set({ modifyFileList }),
    setNotice: (notice) => set({notice}),
    fetchNotices: async () => {
      const { searchCondition, searchKeyword, setPage,page, setNotices } = get();
      try {
        const response = await axios.get('http://${process.env.REACT_APP_BACK_URL}/notice/notice-list', {
          params: {
            searchCondition: searchCondition,
            searchKeyword: searchKeyword,
            page: page,
          }, headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          },
        });
        setNotices(response.data.pageItems);
        setPage(response.data.pageItems.pageable.pageNumber);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    },
    fetchUserNickname: async () => {
      const { setUserNickname } = get();
      try {
        const response = await axios.get('http://${process.env.REACT_APP_BACK_URL}/mypage', {
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
      const { title, content, userNickname, fetchNotices, setOpenDialog, setTitle, setContent, fileDTOList } = get();
      try {
        console.log(content);

        const noticeData = {
          noticeTitle: title,
          noticeContent: content.replaceAll('<', '&lt;').replace(/>/g, '&gt;'),
          noticeWriter: userNickname
        };
        
        console.log(fileDTOList);

        const formData = new FormData();

        const noticeDTO = new Blob([JSON.stringify(noticeData)], {
          type: 'application/json',
        });

        formData.append('noticeDTO', noticeDTO);

        const fileDTOs = new Blob([JSON.stringify(fileDTOList)], {
          type: 'application/json',
        });

        formData.append('fileDTOList', fileDTOs);
  
        await axios.post(`http://${process.env.REACT_APP_BACK_URL}/notice/notice`, formData);
  
        fetchNotices();
  
        setOpenDialog(false);
        alert('공지사항이 등록되었습니다.');
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('Error adding notice:', error);
      }
    },

    handleNoticeModifySubmit: async (putNoticeId) => {
      const { title, content, userNickname, fileDTOList, setModifyFileList, noticeModifyProc } = get();
      try {
        console.log(content);

        const noticeData = {
          id: putNoticeId,
          noticeTitle: title,
          noticeContent: content.replaceAll('<', '&lt;').replace(/>/g, '&gt;'),
          noticeWriter: userNickname
        };

        console.log(noticeData);
        
        console.log(fileDTOList);

        const formData = new FormData();

        const noticeDTO = new Blob([JSON.stringify(noticeData)], {
          type: 'application/json',
        });

        formData.append('noticeDTO', noticeDTO);

        const fileDTOs = new Blob([JSON.stringify(fileDTOList)], {
          type: 'application/json',
        });

        formData.append('fileDTOList', fileDTOs);
  
       const response = await axios.put(`http://${process.env.REACT_APP_BACK_URL}/notice/update`, formData);
        
        setModifyFileList(response.data.item);
        noticeModifyProc(putNoticeId);
      } catch (error) {
        console.error('Error adding notice:', error);
      }
    },
    noticeModifyProc: async (putNoticeId) => {
      const { title, content, userNickname, setOpenDialog, fileDTOList,setUserNickname, modifyFileList,setNotice } = get();
      try {
        const noticeData = {
          id: putNoticeId,
          noticeTitle: title,
          noticeContent: content,
          noticeWriter: userNickname
        };

        const formData = new FormData();

        const noticeDTO = new Blob([JSON.stringify(noticeData)], {
          type: 'application/json',
        });

        formData.append('noticeDTO', noticeDTO);

        const modifyFiles = new Blob([JSON.stringify(modifyFileList)], {
          type: 'application/json',
        });

        formData.append('modifyFiles', modifyFiles);

        const fileDTOs = new Blob([JSON.stringify(fileDTOList)], {
          type: 'application/json',
        });

        formData.append('fileDTOList', fileDTOs);
  
       const response = await axios.put(`http://${process.env.REACT_APP_BACK_URL}/notice/updateProc`, formData);

        setOpenDialog(false);
        alert('공지사항이 수정되었습니다.');
        window.location.reload();
        setNotice(response.data.item);
        setUserNickname(response.data.item.noticeWriter);

      } catch (error) {
        console.error('Error adding notice:', error);
      }
    },
    
    getNotice: async (noticeId) => {
      const { setNotice, userNickname ,setUserNickname, fetchNotices} = get();
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/notice/notice/${noticeId}`,{
        withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          },
        });
        setNotice(response.data.item);
        setUserNickname(userNickname);
          fetchNotices();
        } catch (error) {
          console.log("id 못찾음")
        }
      },
  }));


export default useStore;