import { create } from 'zustand';
import { getContentsIdApi } from '../api/ContentsApi'
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

// 챕터 필수 컨텐츠 파일 정보 상태 및 액션//////////////////////////////
export const contentsFileStore = create(set => ({
  contentsFile: [],
  addContentsFile: (newContentFile) => set((state) => ({
    contentsFile: [...state.contentsFile, newContentFile]
  })),
  contentsFileTitleInput: (newcontentsFileTitleInput) => set(state => ({
    contentsFile: { ...state.contentsFile, ...newcontentsFileTitleInput }
  })),
  removeContentsFile: () => set((state) => ({
    contentsFile: state.contentsFile.slice(0, -1),
  })),
}));

// 챕터 1에 대한 입력 정보 상태 및 액션//////////////////////////////
export const useChapterOneStore = create(set => ({
  chapterOne: {
    category: '',
    priceType: '',
    price: '',
    contentsTitle: '',
  },
  chapterOneInput: (newContents) => set(state => ({
    chapterOne: { ...state.chapterOne, ...newContents }
  })),
  saveChapterOne: async (chapterOne) => {
    const data = await insertApi(chapterOne);
    set({ chapterOne: data });
  },
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

  saveChapteTwo: async (chapterTwo) => {
    const data = await insertApi(chapterTwo);
    set({ chapterTwo: data });
  },
}));

// 상세 페이지 리스폰 데이터
export const useContentsStore = create((set) => ({
  getContentsOne: [],
  getContentsOneOutput: async (contentId) => {
      try {
          const data = await getContentsIdApi(contentId);
          set({ getContentsOne: data.item });
      } catch (error) {
          console.error(error);
      }
  }
}));

// 영상 별 입력 정보 상태 및 액션
export const useVideoReplyStore = create(set => ({
  videoReply: {
    videoReplyId: '',
    content: '',
    username: '',
    userProfile: '',
  },
  commitVideoReply: async (videoReply) => {
    const data = await insertApi(videoReply);
    set({ chapterOne: data });
  },
}));