import axios from 'axios';


export const getContentsIdApi = async (contentsId) => {

  console.log("======올까 api?=======" + contentsId);

  const token = sessionStorage.getItem("ACCESS_TOKEN");
  console.log("Sending token: ", token);

  try {
      const response = await axios.get(`http://localhost:9090/contents/detail`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
        },
        params: { contentsId } // 여기서 contentsId를 query parameter로 넘겨주고 있음
      });
      return response.data;
  } catch (error) {
      throw error;
  }
}

export const insertApi = async (chapterOne, chapterTwo) => {
  console.log("=============" + chapterOne, chapterTwo);
  try {

    const requestBody = {
      contentsDTO: chapterOne,
      sectionDTO: chapterTwo,
    };

    const response = await axios.post('http://localhost:9090/contents/create',
    requestBody,
    
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
      },
      // params: {
      //   searchCondition: search.searchCondition,
      //   searchKeyword: search.searchKeyword,
      //   page: search.page
      // }
    }

  );
    return response.data;
  } catch (error) {
    throw error;
  }
};