import create from "zustand";
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
  contentsId: 0,
  loginMemberId: "",
  loginMemberNickname: "",
  loginMemberRole: "",
  inquiries: [],
  paymentList: [],
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

  fetchInquiries: async (contentsId) => {
    const { searchCondition, searchKeyword, setPage, page, setInquiries } =
      get();
    try {
      const response = await axios.get(
        "http://localhost:9090/inquiry/inquiry",
        {
          params: {
            searchCondition: searchCondition,
            searchKeyword: searchKeyword,
            page: page,
            contentsId: contentsId,
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      setInquiries(response.data.inquiryList);
      setPage(response.data.inquiryList.pageable.pageNumber);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  },

  handleInquirySubmit: async (inquiryTitle, inquiryContent) => {
    const { inquiryFileDTOList } = get();
    try {
      const noticeData = {
        inquiryTitle: inquiryTitle,
        inquiryContent: inquiryContent
          .replaceAll("<", "&lt;")
          .replace(/>/g, "&gt;"),
      };

      const formData = new FormData();

      const noticeDTO = new Blob([JSON.stringify(noticeData)], {
        type: "application/json",
      });

      formData.append("noticeDTO", noticeDTO);

      const inquiryFileDTOs = new Blob([JSON.stringify(inquiryFileDTOList)], {
        type: "application/json",
      });

      formData.append("fileDTOList", inquiryFileDTOs);

      await axios.post("http://localhost:9090/inquiry/inquiry", formData);
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
      const noticeData = {
        id: inquiryId,
        inquiryTitle: inquiryTitle,
        inquiryContent: inquiryContent,
      };

      const formData = new FormData();

      const inquiryDTO = new Blob([JSON.stringify(noticeData)], {
        type: "application/json",
      });

      formData.append("inquiryDTO", inquiryDTO);

      const inquiryFileDTOs = new Blob([JSON.stringify(inquiryFileDTOList)], {
        type: "application/json",
      });

      formData.append("inquiryFileDTOList", inquiryFileDTOs);

      const response = await axios.put(
        "http://localhost:9090/inquiry/update",
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
        "http://localhost:9090/inquiry/updateProc",
        formData
      );

      console.log(response.data.item);
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  },
}));

export default useStore;
