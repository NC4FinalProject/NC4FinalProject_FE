import axios from 'axios';

export async function fetchContentsApi() {

    const token = sessionStorage.getItem("ACCESS_TOKEN");
    console.log("Sending token: ", token);

    try {
        const response = await axios.get(`http://localhost:9090/contents/listAll`, {
            // headers: {
            //     Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
            // }
            // params: {
            //     searchCondition: search.searchCondition,
            //     searchKeyword: search.searchKeyword,
            //     page: search.page
            // }
        });
        // console.log(response.headers); // 모든 응답 헤더를 콘솔에 출력
        // console.log(response.headers['content-type']); // 예를 들어, 특정 헤더 'Content-Type' 확인하기
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const ChapterOneApiSave = async (chapterOne) => {
    try {
      const response = await axios.post('http://localhost:9090/contents/listAll', 
      chapterOne,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
    //     },
    //     params: {
    //       searchCondition: search.searchCondition,
    //       searchKeyword: search.searchKeyword,
    //       page: search.page
    //     }
    //   }
    );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  