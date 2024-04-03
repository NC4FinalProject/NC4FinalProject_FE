import axios from 'axios';

export const contentsIdApi = async (contentsId) => {

    const token = sessionStorage.getItem("ACCESS_TOKEN");
    console.log("Sending token: ", token);

    try {
        const response = await axios.get(`http://localhost:9090/contents/detail/${contentsId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          }
        // params: {
        //     searchCondition: search.searchCondition,
        //     searchKeyword: search.searchKeyword,
        //     page: search.page
        // }
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