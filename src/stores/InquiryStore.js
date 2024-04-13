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

  fetchInquiries: async (contentsId) => {
    const { searchCondition, searchKeyword, setPage, page } = get();
    try {
      const response = await axios.get(
        "http://${process.env.REACT_APP_BACK_URL}/inquiry/inquiry",
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
    isPrivate,
    contentsId,
    inquiryFileDTOList,
    fetchInquiries
  ) => {
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

      const formData = new FormData();

      const inquiryDTO = new Blob([JSON.stringify(inquiryData)], {
        type: "application/json",
      });

      formData.append("inquiryDTO", inquiryDTO);

      const inquiryFileDTOs = new Blob([JSON.stringify(inquiryFileDTOList)], {
        type: "application/json",
      });

      formData.append("inquiryFileDTOList", inquiryFileDTOs);

      formData.append("tagDTOList", JSON.stringify(tagContent));

      formData.forEach(function (value, key) {
        console.log(key + ": " + value);
      });

      await axios.post(`http://${process.env.REACT_APP_BACK_URL}/inquiry/inquiry`, formData, {
        params: { contentsId: contentsId },
      });

      fetchInquiries();
      alert("문의가 등록되었습니다.");
    } catch (error) {
      console.error("Error adding inquiry:", error);
    }
  },

  handleInquiryModifySubmit: async (
    inquiryId,
    inquiryTitle,
    inquiryContent
  ) => {
    const { inquiryFileDTOList, setInquiryModifyFileList, inquiryModifyProc } =
      get();
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

      const inquiryFileDTOs = new Blob([JSON.stringify(inquiryFileDTOList)], {
        type: "application/json",
      });

      formData.append("inquiryFileDTOList", inquiryFileDTOs);

      const response = await axios.put(
        "http://${process.env.REACT_APP_BACK_URL}/inquiry/update",
        formData
      );

      setInquiryModifyFileList(response.data.item);
      inquiryModifyProc(inquiryId);
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
        "http://${process.env.REACT_APP_BACK_URL}/inquiry/updateProc",
        formData
      );

      console.log(response.data.item);
    } catch (error) {
      console.error("Error adding inquiry:", error);
    }
  },
}));

export default useStore;
