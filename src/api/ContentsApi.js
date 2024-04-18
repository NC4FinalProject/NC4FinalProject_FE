import axios from 'axios';

export const getContentsIdApi = async (contentsId) => {

  console.log("======올까 api?=======" + contentsId);

  // const token = sessionStorage.getItem("ACCESS_TOKEN");
  // console.log("Sending token: ", token);

  try {
      const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/contents/detail/${contentsId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
        },
        // params: { contentsId } // 여기서 contentsId를 query parameter로 넘겨주고 있음
      });
      console.log("111111")
      console.log(response.data);
      return response.data;
  } catch (error) {
      throw error;
  }
}

// 전체 목록 가져오기
export const getContentsListApi = async(category, pricePattern, orderType, page, searchKeyword)=>{
  try {
    const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/contents/list`, {
      // headers: {
      //   Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
      // },
      params: { 
        category: category,
        pricePattern: pricePattern,
        orderType: orderType,
        page: page,
        searchKeyword: searchKeyword
      } // 여기서 contentsId를 query parameter로 넘겨주고 있음
    });
    console.log(response.data)
    return response.data;
} catch (error) {
    throw error;
}}

// 전체 목록 가져오기
export const getMyContentsListApi = async (page)=>{
  try {
    const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/contents/mylist`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
      },
      params: {
        page: page
      } // 여기서 contentsId를 query parameter로 넘겨주고 있음
    });
    console.log(response.data)
    return response.data;
} catch (error) {
    throw error;
}}

export const getBookmarkContentsListApi = async (page)=>{
  try {
    const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/contents/bookmarklist`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
      },
      params: {
        page: page
      } // 여기서 contentsId를 query parameter로 넘겨주고 있음
    });
    console.log("111111111111111");
    console.log(response.data)
    return response.data;
} catch (error) {
    throw error;
}}

export const insertApi = async (chapterOne, chapterTwo, videoInfo, videoFile, thumbnail, contentsData, contentsFileDTOList) => {
  console.log("=======에이피아이쪽======" + chapterOne +"11111"+ chapterTwo +"11111"+ videoInfo +"11111"+ videoFile +"11111"+ thumbnail);
  
  const formData = new FormData();

  const saveChapterOne = {
    ...chapterOne,
    introduce: contentsData
              .replaceAll("<", "&lt;")
              .replace(/>/g, "&gt;"),
  };

  const insertRequestDTO = {
    contentsDTO: saveChapterOne,
    sectionDTO: chapterTwo,
    videoDTO: videoInfo
  };
  
  formData.append("insertRequestDTO", new Blob([JSON.stringify(insertRequestDTO)], { type: "application/json" }));
  formData.append("thumbnail", thumbnail);
  videoFile.forEach(videoFileData => formData.append("videoFile", videoFileData));
  
  const contentsFileDTOs = new Blob([JSON.stringify(contentsFileDTOList)], {
    type: "application/json",
  });
  formData.append("contentsFileDTOList", contentsFileDTOs);

  try {
    const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/contents/create`, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        // 'Content-Type': 'multipart/form-data' 
      },
    });
    console.log('서버 응답:', response.data);
  } catch (error) {
    console.error('데이터 전송 중 에러 발생:', error);
    console.log(formData);
    if (error.response) {
      // 서버에서 반환된 응답 본문에 접근
      console.log(error.response.data);
    }
  }
};

export const saveVideoReplyApi = async (videoReply) => {
  try {
    await axios.post(`http://${process.env.REACT_APP_BACK_URL}/contents/detail/saveVideoReply`, videoReply, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
      },
    });
    // 요청이 성공적으로 처리되었을 때 필요한 처리를 여기에 추가할 수 있습니다.
    // 예: console.log('댓글이 성공적으로 저장되었습니다.');
  } catch (error) {
    console.error('데이터 전송 중 에러 발생:', error);
    if (error.response) {
      // 서버로부터의 오류 응답을 처리합니다.
      console.log(error.response.data);
    }
  }
};


export const getVideoReplyApi = async (contentsId, videoId) => {
  try {
    const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/contents/detail/getVideoReplyList`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
      },
      params: {
        contentsId: contentsId,
        videoId: videoId,
      },
    });
    console.log(contentsId, videoId)
    console.log("아오씨 데이터 받아오나 마?")
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('데이터 요청 중 에러 발생:', error);
    if (error.response) {
      // 서버로부터의 오류 응답을 처리합니다.
      console.log(error.response.data);
    }
  }
};