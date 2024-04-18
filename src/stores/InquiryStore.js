import { create } from "zustand";
import axios from "axios";
const useStore = create((set, get) => ({
  searchCondition: "all",
  searchKeyword: "",
  page: 0,
  inquiryFiles: [],
  inquiryFileDTOList: [],
  inquiryModifyFileList: [],
  likeCnt: 0,
  liked: 0,
  loginMemberId: "",
  loginMemberNickname: "",
  loginMemberRole: "",
  inquiries: [],
  paymentList: [],
  tagDTOList: [],
  contentsId: 0,
  isPrivate: false,
  inquiry: {},
  comments: [],
  setLikeCheck: (liked) => set({ liked }),
  setLikeCnt: (likeCnt) => set({ likeCnt }),
  setInquiryFiles: (inquiryFiles) => set({ inquiryFiles }),
  setInquiries: (inquiries) => set({ inquiries }),
  setSearchCondition: (searchCondition) => set({ searchCondition }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
  setPage: (page) => set({ page }),
  setInquiryFileDTOList: (inquiryFileDTOList) => set({ inquiryFileDTOList }),
  setInquiryModifyFileList: (inquiryModifyFileList) =>
    set({ inquiryModifyFileList }),
  setContentsId: (contentsId) => set({ contentsId }),
  setIsPrivate: (isPrivate) => set({ isPrivate }),
  setInquiry: (inquiry) => set({inquiry}),
  setComments: (comments) => set({comments}),
  fetchInquiries: async (contentsId) => {
    const { searchCondition, searchKeyword, setPage, page } = get();
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/inquiry`,
        {
          params: {
            searchCondition: searchCondition,
            searchKeyword: searchKeyword,
            page: page,
            contentsId: parseInt(contentsId),
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      set({
        inquiries: response.data.inquiryList,
        search: response.data.search,
        loginMemberRole: response.data.loginMemberRole,
        loginMemberId: response.data.loginMemberId,
        loginMemberNickname: response.data.loginMemberNickname,
        paymentList: response.data.paymentList,
      });
      setPage(response.data.inquiryList.pageable.pageNumber);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  },

  handleInquirySubmit: async (
    inquiryTitle,
    inquiryContent,
    tagContent,
    contentsId,
    inquiryFileDTOList
  ) => {
    const {setInquiries, setPage, isPrivate} = get();
    try {
      const inquiryData = {
        inquiryTitle: inquiryTitle,
        inquiryContent: inquiryContent
          .replaceAll("<", "&lt;")
          .replace(/>/g, "&gt;"),
        isPrivate: isPrivate || false,
      };
      console.log("태그", tagContent);
      console.log("문의 데이터", inquiryData);
      console.log("아이디는", contentsId);
      console.log("타입은", typeof contentsId);
      console.log(inquiryFileDTOList);

      const formData = new FormData();

      const inquiryDTO = new Blob([JSON.stringify(inquiryData)], {
        type: "application/json",
      });

      formData.append("inquiryDTO", inquiryDTO);
      formData.append("isPrivate", new Blob([JSON.stringify(isPrivate)], {
        type: "application/json",
      }));

      const inquiryFileDTOs = new Blob([JSON.stringify(inquiryFileDTOList)], {
        type: "application/json",
      });

      formData.append("inquiryFileDTOList", inquiryFileDTOs);

      const tagDTOs = tagContent.map(tag => ({
        tagContent: tag
      }));

      formData.append("tagDTOList", new Blob([JSON.stringify(tagDTOs)], {
        type: "application/json",
      }));

      formData.forEach(function (value, key) {
        console.log(key + ": " + value);
      });

      const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/inquiry/inquiry/${contentsId}`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(response);
      setInquiries(response.data.pageItems);
      setPage(response.data.pageItems.pageable.pageNumber);
      alert("문의가 등록되었습니다.");
      window.location.href=`/detail/${contentsId}?tab=inquiry`
    } catch (error) {
      console.error("Error adding inquiry:", error);
    }
  },

  handleInquiryModifySubmit: async (
    inquiryId,
    inquiryTitle,
    inquiryContent,
    tagContent,
    contentsId
  ) => {
    const {isPrivate, inquiryFileDTOList, setInquiry } =
      get();
    try {
      const inquiryData = {
        inquiryId: inquiryId,
        inquiryTitle: inquiryTitle,
        inquiryContent: inquiryContent
          .replaceAll("<", "&lt;")
          .replace(/>/g, "&gt;"),
        isPrivate: isPrivate || false,
      };

      const formData = new FormData();

      const inquiryDTO = new Blob([JSON.stringify(inquiryData)], {
        type: "application/json",
      });

      formData.append("inquiryDTO", inquiryDTO);
      formData.append("isPrivate", new Blob([JSON.stringify(isPrivate)], {
        type: "application/json",
      }));

      const inquiryFileDTOs = new Blob([JSON.stringify(inquiryFileDTOList)], {
        type: "application/json",
      });

      formData.append("inquiryFileDTOList", inquiryFileDTOs);

      formData.append("tagDTOList", new Blob([JSON.stringify(tagContent)], {
        type: "application/json",
      }));

      const response = await axios.put(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/update/${contentsId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          }
        }
      );

      setInquiry(response.data.item);

      alert("문의가 수정되었습니다.");
    } catch (error) {
      console.error("Error adding inquiry:", error);
    }
  },
  inquiryModifyProc: async (inquiryId, inquiryTitle, inquiryContent) => {
    const { inquiryFileDTOList, inquiryModifyFileList } = get();
    try {
      const inquiryData = {
        id: inquiryId,
        inquiryTitle: inquiryTitle,
        inquiryContent: inquiryContent,
      };

      const formData = new FormData();

      const inquiryDTO = new Blob([JSON.stringify(inquiryData)], {
        type: "application/json",
      });

      formData.append("inquiryDTO", inquiryDTO);

      const inquiryModifyFiles = new Blob(
        [JSON.stringify(inquiryModifyFileList)],
        {
          type: "application/json",
        }
      );

      formData.append("inquiryModifyFiles", inquiryModifyFiles);

      const inquiryFileDTOs = new Blob([JSON.stringify(inquiryFileDTOList)], {
        type: "application/json",
      });

      formData.append("inquiryFileDTOs", inquiryFileDTOs);

      const response = await axios.put(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/updateProc`,
        formData
      );

      console.log(response.data.item);
    } catch (error) {
      console.error("Error adding inquiry:", error);
    }
  },
  updateInquiryView: async(inquiryId) => {
    const {setInquiry} = get();
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/updateInquiryView/${inquiryId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          }
        }
      );

      setInquiry(response.data.item);
    } catch(e) {
      console.log(e);
    }
  },
  fetchMyInquiries: async(contentsId) => {
    const {setInquiries, setPage, searchCondition, searchKeyword} = get();

    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/myInquiries/${contentsId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          },
          params: {
            searchCondition: searchCondition,
            searchKeyword: searchKeyword
          }
        }
      );

      console.log(response);

      setInquiries(response.data.pageItems);
      setPage(response.data.pageItems.pageable.pageNumber);
    } catch(e) {
      console.log(e);
    }
  },
  deleteInquiry: async(inquiryId, contentsId) => {
    const {setInquiries, setPage, searchCondition, searchKeyword} = get();

    try {
      const response = await axios.delete(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/delete/${inquiryId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          },
          params: {
            contentsId: contentsId,
            searchCondition: searchCondition,
            searchKeyword: searchKeyword
          }
        }
      );
      alert("삭제되었습니다.");
      setInquiries(response.data.pageItems);
      setPage(response.data.pageItems.pageable.pageNumber);
    } catch(e) {
      console.log(e);
    }
  },
  postComment: async (commentContent, inquiryId) => {
    const {setComments} = get();
    try {
      const commentData = {
        inquiryId: inquiryId,
        inquiryCommentContent: commentContent
                              .replaceAll("<", "&lt;")
                              .replace(/>/g, "&gt;"),
      }

      const response = await axios.post(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/comment`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          }
        }
      );
      alert("댓글이 등록됐습니다.");
      console.log(response);
      setComments(response.data.items);
    } catch(e) {
      console.log(e);
    }
  },
  modifyComment: async(inquiryCommentContent, inquiryCommentId) => {
    const {setComments} = get();
    try {
      const commentData = {
        inquiryCommentId: inquiryCommentId,
        inquiryCommentContent: inquiryCommentContent
                              .replaceAll("<", "&lt;")
                              .replace(/>/g, "&gt;"),
      }

      const respone = await axios.put(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/comment`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          }
        }
      );
      alert("댓글이 수정됐습니다.");
      setComments(respone.data.items);
    } catch(e) {
      console.log(e)
    }
  },
  deleteComment: async (inquiryId, inquiryCommentId) => {
    const {setComments} = get();
    try {
      const respone = await axios.delete(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/comment/${inquiryCommentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          },
          params: {
            inquiryId: inquiryId
          }
        }
      );

      alert("댓글이 삭제됐습니다.");
      setComments(respone.data.items);
    } catch(e) {
      console.log(e);
    }
  },
  getComment: async (inquiryId, order) => {
    const {setComments} = get();
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/comments/${inquiryId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          },
          params: {
            order: order
          }
        }
      );

      setComments(response.data.items);
    } catch(e) {
      console.log(e);
    }
  }
}));

export default useStore;
