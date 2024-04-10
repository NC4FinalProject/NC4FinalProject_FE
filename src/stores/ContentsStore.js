import { create } from 'zustand';
import { getContentsIdApi, getContentsListApi } from '../api/ContentsApi'
import { insertApi } from '../api/ContentsApi';

// 가격타입
export const contentsPriceTypeItems = [
  { id: "el1", type: "무료 강의" },
  { id: "el2", type: "유료 강의" },
  { id: "el3", type: "국비 지원" },
];

// 카테고리 
export const contentsCategoryItems = [
  { id: "el1", type: "개발 · 프로그래밍" },
  { id: "el2", type: "게임 개발" },
  { id: "el3", type: "데이터 사이언스" },
  { id: "el4", type: "인공지능" },
  { id: "el5", type: "보안 · 네트워크" },
  { id: "el6", type: "비즈니스 · 마케팅" },
  { id: "el7", type: "인공지능" },
  { id: "el8", type: "보안 · 네트워크" },
  { id: "el9", type: "하드웨어" },
  { id: "el10", type: "웹 디자인" },
];


// 챕터 1에 대한 입력 정보 상태 및 액션//////////////////////////////
export const useChapterOneStore = create(set => ({
  chapterOne: {
    category: '',
    priceType: '',
    price: '',
    contentsTitle: '',
},
  videoInfo: [],
  videoFile: [],
  thumbnail: '',
  //////////////////////////////////////////////////////////////////
  chapterOneInput: (newContents) => set(state => ({
    chapterOne: { ...state.chapterOne, ...newContents }
  })),
  // 이 함수의 정체를 모르겠다?
  saveChapterOne: async (chapterOne) => {
    const data = await insertApi(chapterOne);
    set({ chapterOne: data });
  },
  //////////////////////////////////////////////////////////////////
  videoInfoTitleInput: (index, newVideoInfoTitleInput) => set((state) => {
    const videoInfoTitleInput = state.videoInfo.map((videoInfoTitleChange, idx) => {
      if (idx === index) {
        console.log("전역 상태에 업데이트가 되었구만유!")
        return { ...videoInfoTitleChange, videoTitle: newVideoInfoTitleInput};
      }
      return videoInfoTitleChange;
    });
    return { videoInfo: videoInfoTitleInput };
  }),
  addVideoInfo: (newVideoInfo) => set((state) => ({
    videoInfo: [...state.videoInfo, newVideoInfo]
  })),
  addVideoFile: (newVideoFile) => set((state) => ({
    videoFile: [...state.videoFile, newVideoFile]
  })),
  removeVideoInfo: () => set((state) => ({
    videoInfo: state.videoInfo.slice(0, -1),
  })),
  removeVideoFile: (videoId) => set((state) => ({
    chapterTwo: state.videoFile.filter(videoFileByOne => videoFileByOne.videoId !== videoId)
  })),
  uploadThumbnail: (newThumbnail) => set(() => ({
    thumbnail: newThumbnail
  }))

}));

// 챕터 2에 대한 입력 정보 상태 및 액션//////////////////////////////
export const useChapterTwoStore = create((set) => ({
  chapterTwo: [],
  // 독립적인 메인 섹션 입력 단 & 아이디 값 부여되서 옴
  sectionTitleInput: (index, newTitle) => set((state) => {
    const sectionTitleInput = state.chapterTwo.map((chapterTwoChange, idx) => {
      if (idx === index) {
        return { ...chapterTwoChange, sectionTitle: newTitle};
      }
      return chapterTwoChange;
    });
    return { chapterTwo: sectionTitleInput };
  }),
  // 독립적인 서브 섹션 입력 단 & 아이디 값 부여되서 옴
  sectionSubTitleInput: (sectionSubId, sectionId, newSubTitle) => set((state) => {
    const chapterTwoUpdated = state.chapterTwo.map((section) => {
      const sectionSubListUpdated = section.sectionSubList.map((subSection) => {
        if (subSection.sectionId === sectionId && subSection.sectionSubId === sectionSubId) {
          return { ...subSection, sectionSubTitle: newSubTitle };
        }
        return subSection;
      });
      return { ...section, sectionSubList: sectionSubListUpdated };
    });
    return { ...state, chapterTwo: chapterTwoUpdated };
  }),
  // 메인 섹션 객체 추가
  addSection: (newSection) => set((state) => ({
    chapterTwo: [...state.chapterTwo, newSection]
  })),
  // 메인 섹션 객체 삭제
  removeSection: (sectionId) => set((state) => ({
    chapterTwo: state.chapterTwo.filter(section => section.sectionId !== sectionId)
  })),
  // 서브 섹션 객체 추가
  addSectionSub: (sectionId, newSectionSub) => set((state) => {
    console.log("addSectionSub 호출됨");
    console.log("전달된 sectionId:", sectionId);
    console.log("추가될 newSectionSub:", newSectionSub);
  
    const updatedChapterTwo = state.chapterTwo.map((section) => {
      console.log("현재 섹션의 sectionId:", section.sectionId);
      if (section.sectionId === sectionId) {
        console.log("일치하는 섹션 발견:", section);
        return { ...section, sectionSubList: [...section.sectionSubList, newSectionSub] };
      } else {
        return section;
      }
    });
  
    console.log("업데이트된 chapterTwo:", updatedChapterTwo);
    return { chapterTwo: updatedChapterTwo };
  }),
  // 서브 섹션 객체 삭제
  removeSectionSub: (sectionSubId) => set((state) => ({
    chapterTwo: state.chapterTwo.map(section => {
      // 각 섹션의 sectionSubList에서 해당하는 하위 섹션 ID를 제외하고 필터링
      const newSectionSubList = section.sectionSubList.filter(subSection => subSection.sectionSubId !== sectionSubId);
      // 필터링된 sectionSubList로 각 섹션을 업데이트
      return { ...section, sectionSubList: newSectionSubList };
    })
  })),

  // 정체를 모르겠다;;
  saveChapteTwo: async (chapterTwo) => {
    const data = await insertApi(chapterTwo);
    set({ chapterTwo: data });
  },
}));

// 폼데이터 보내야함 사진, 동영상을 함께 보내야 돼? 
// export const useFile

// 상세 페이지 리스폰 데이터
export const useContentsStore = create((set) => ({
  getContents: [],
  getVideo: [],
  getSection: [],
  stateNum: 1,
  getContentsOutput: async (contentId) => {
      try {
          const data = await getContentsIdApi(contentId);
          set({ getContents: data.item,
                getVideo: data.item.videoList,
                getSection: data.item.sectionList,
          });
      } catch (error) {
          console.error(error);
      }
  },
  stateNumChange: (newSelect) => set(() => ({
    stateNum: newSelect
  })),
}));
// 전체 페이지 리스폰 데이터
export const useContentsListStore = create((set) => ({
  getContentsList: [],
  selectPage: '',

  getContentsListOutput: async () => {
      try {
          const data = await getContentsListApi();
          set({ getContentsList: data.items,
          });
      } catch (error) {
          console.error(error);
      }
  },
  selectPageChange: (newSelect) => set(() => ({
    selectPage: newSelect
  })),

}));


// 상세페이지 영상 별 댓글 입력 정보 상태 및 액션
export const useVideoReplyStore = create((set) => ({
  videoReplyContent: '',
  // 여기서는 댓글 입력 내용하고 해당 비디오 넘버 만 보내 주면 되나? 컨텐츠 아이디는 안필요해? 백에서 유추할 수 있을까?
  // videoReplyInput: (videoId, newContent) => set((state) => {
  //   const videoReplyInput = state.chapterTwo.map((videoReplyChange, idx) => {
  //     if (idx === videoId) {
  //       return { ...videoReplyChange, videoReplyContent: newContent};
  //     }
  //     return videoReplyChange;
  //   });
  //   return { videoReply: videoReplyInput };
  // }),
  videoReplyContentInput: (newVideoReplyContent) => set(() => ({
    videoReplyContent: newVideoReplyContent
  })),
}));




