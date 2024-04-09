import axios from 'axios';

export const getContentsIdApi = async (contentsId) => {

  console.log("======올까 api?=======" + contentsId);

  // const token = sessionStorage.getItem("ACCESS_TOKEN");
  // console.log("Sending token: ", token);

  try {
      const response = await axios.get(`http://175.45.203.117:9090/contents/detail/${contentsId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
        },
        // params: { contentsId } // 여기서 contentsId를 query parameter로 넘겨주고 있음
      });
      return response.data;
  } catch (error) {
      throw error;
  }
}

// export const insertApi = async (chapterOne, chapterTwo, videoInfo, videoFile, thumbnail) => {
//   console.log("=============" + chapterOne, chapterTwo, videoInfo, videoFile, thumbnail);
//   try {
//     const requestBody = {
//       contentsDTO: chapterOne,
//       sectionDTO: chapterTwo,
//       videoDTO: videoInfo,
//       formVideoFile: videoFile,
//       formThumbnail: thumbnail
//     };

//     const response = await axios.post('http://175.45.203.117:9090/contents/create',
//     requestBody,
    
//     {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
//       },
//       // params: {
//       //   searchCondition: search.searchCondition,
//       //   searchKeyword: search.searchKeyword,
//       //   page: search.page
//       // }
//     }

//   );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


export const insertApi = async (chapterOne, chapterTwo, videoInfo, videoFile, thumbnail) => {
  console.log("=======에이피아이쪽======" + chapterOne +"11111"+ chapterTwo +"11111"+ videoInfo +"11111"+ videoFile +"11111"+ thumbnail);
  
  const formData = new FormData();

  const insertRequestDTO = {
    contentsDTO: chapterOne,
    sectionDTO: chapterTwo,
    videoDTO: videoInfo
  };
  
  formData.append("insertRequestDTO", new Blob([JSON.stringify(insertRequestDTO)], { type: "application/json" }));
  formData.append("thumbnail", thumbnail);
  videoFile.forEach(videoFileData => formData.append("videoFile", videoFileData));

  try {
    const response = await axios.post('http://175.45.203.117:9090/contents/create', formData, {
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
