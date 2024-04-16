import create from 'zustand';
import axios from 'axios';

const AdminStore = create((set, get) => ({
  Notices: [],
  Users: [],
  NewUser: [],
  MonthlytotalUserCount: [],
  MonthlyCounts: [],
  userRole: 'null',
  MemberInfo: [],
  page: 0,
  Memo: '',
  userPw: '',
userPwChk: '',
  pwValidation: false,
  pwChk: false,
  searchCondition: 'all',
  searchKeyword: '',
  preTeacherCount: 0,
  daliyOutUserCount: [],
  monthlyOutUserCount: [],
  preTeachers: [],
  todayUserCount: 0,
  selectRole: '',
  pointSum: 0,
  reason:'',
  point: 0,
  contents: [],
  qnauser: [],
  qnaUserCount: 0,
  setQnaCount: (qnaUserCount) => set({qnaUserCount}),
  setQnaUser: (qnauser) => set({qnauser}),
  setContents: (contents) => set({ contents }),
  setPoint: (point) => set({ point }),
  setReason: (reason) => set({ reason }),
  setPointSum: (pointSum) => set({ pointSum }),  
  setSelectedRole: (selectRole) => set({ selectRole }),
  setTodayUserCount: (todayUserCount) => set({ todayUserCount }),
  setUserPw: (userPw) => set({ userPw }),
  setUserPwChk: (userPwChk) => set({ userPwChk }),
  setPwValidation: (isValid) => set({ pwValidation: isValid }),
  setPwChk: (isMatch) => set({ pwChk: isMatch }),
  setMemo: (Memo) => set({ Memo }),
  setPreTeachers: (preTeachers) => set({ preTeachers }),
  setMonthlyOutUserCount: (monthlyOutUserCount) => set({ monthlyOutUserCount }),
  setDailyOutUserCount: (daliyOutUserCount) => set({ daliyOutUserCount }),
  setPreTeacherCount: (preTeacherCount) => set({ preTeacherCount }),
  setSearchCondition: (searchCondition) => set({ searchCondition }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
  setPage: (page) => set({ page }),
  setMemberInfo: (MemberInfo) => set({ MemberInfo }),
  setUserRole: (userRole) => set({ userRole }),
  setMonthlyCounts: (MonthlyCounts) => set({ MonthlyCounts }),
  setMonthlytotalUserCount: (MonthlytotalUserCount) => set({ MonthlytotalUserCount }),
  setNewUser: (NewUser) => set({ NewUser }),
  setUsers: (Users) => set({ Users }),
  setNotices: (Notices) => set({ Notices }),

  
  userNotice: async () => {
    const { setNotices, setUsers, setNewUser,setMonthlytotalUserCount,setMonthlyCounts,setPreTeacherCount
            ,setDailyOutUserCount,setMonthlyOutUserCount,setPreTeachers,setTodayUserCount,setContents,setQnaUser,setQnaCount } = get();
    try {
        const response = await axios.get('http://localhost:9090/admin/main', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        const { notices, recentUsers, registrationCounts,contents,QnaCount,
                monthlytotalUserCount,monthlyCounts,preTeacherCount,daliyOutUserCount, monthlyOutUserCount,preTeachers,todayUserCount,qnauser,qnaUserCount } = response.data;
        console.log(response.data);
        setNotices(notices);
        setUsers(recentUsers);
        setNewUser(registrationCounts)   
        setMonthlytotalUserCount(monthlytotalUserCount);
        setMonthlyCounts(monthlyCounts);
        setPreTeacherCount(preTeacherCount);
        setDailyOutUserCount(daliyOutUserCount);
        setMonthlyOutUserCount(monthlyOutUserCount);
        setPreTeachers(preTeachers);
        setTodayUserCount(todayUserCount);
        setContents(contents);
        setQnaUser(qnauser);
        setQnaCount(qnaUserCount);
    } catch (error) {
        console.log('에러:', error);
    }
},

 userInfo: async () => {
    const { setMemberInfo, searchCondition, searchKeyword,page,setPage } = get();
    try {
        const response = await axios.get('http://localhost:9090/admin/user', {
            params: {
                searchCondition: searchCondition,
                searchKeyword: searchKeyword,
                page: page,
              },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        setPage(response.data.pageable.pageNumber);
       setMemberInfo(response.data);

    } catch (error) {
        console.log('에러:', error);
    }
},

userDetail: async (userId) => {
    const { setMemberInfo, setMemo, setPointSum } = get();
    try {
        const response = await axios.get(`http://localhost:9090/admin/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        console.log(response.data);
        setMemberInfo(response.data);
        setMemo(response.data.memo || '');
        const points = response.data.pointDTOList;
        let sum = 0;
            for (const point of points) {
                sum += point.value;
            }
        setPointSum(sum);
        console.log(sum);
    } catch (error) {
        console.log('에러:', error);
    }
},

userChangeRole: async (userId) => {
    const { selectRole, userInfo } = get();
    try {
        const response = await axios.put(`http://localhost:9090/admin/user/${userId}`, {
            role: selectRole,
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        alert('권한이 변경되었습니다.');
        window.location.reload();
    } catch (error) {
        console.log('에러:', error);
    }
},
handleSavePoint: async (userId) => {
    const { point, reason } = get();

    try {
        const response = await axios.post(`http://localhost:9090/admin/user/point/${userId}`, {
            value: point,
            reason: reason,
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        alert('포인트가 적립되었습니다.');
        window.location.reload();
    } catch (error) {
        console.log('에러:', error);
    }
},
getContentsList: async () => {
    const { setContents, searchCondition, searchKeyword,page,setPage } = get();
    try {
        const response = await axios.get('http://localhost:9090/admin/contents', {
            params: {
                searchCondition: searchCondition,
                searchKeyword: searchKeyword,
                page: page,
              },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        setPage(response.data.pageable.pageNumber);
        setContents(response.data);
    } catch (error) {
        console.log('에러:', error);
    }
},

getQnaAnswer: async () => {
    const { setQnaUser, searchCondition, searchKeyword,page,setPage } = get();
    try {
        const response = await axios.get('http://localhost:9090/admin/qna', {
            params: {
                searchCondition: searchCondition,
                searchKeyword: searchKeyword,
                page: page,
              }, 
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        })
        setPage(response.data.pageItems.pageable.pageNumber);
        setQnaUser(response.data.pageItems.content);
        console.log(response.data.pageItems);
    } catch (error) {
        console.log('에러:', error);
    }
},

sendQnaAnswer: async (id, answerUser, content) => {
    console.log(answerUser);
    console.log(content);
    try {
    await axios.post('http://localhost:9090/admin/answerqna',{
        id: id,
        answerUser: answerUser,
        content: content,
        createdAt: new Date().toISOString()
    });
    console.log("잘되었나.")
} catch(error) {
    console.log(error);
}
},
getUserQnaResult: async () => {
    const { setQnaUser,page,setPage } = get();
    try {
        const response = await axios.get('http://localhost:9090/mypage/qna', {
            params: {
                page: page
              }, 
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        })
        console.log(response.data);
        setPage(response.data.pageItems.pageable.pageNumber);
        setQnaUser(response.data.pageItems.content);
    } catch (error) {
        console.log('에러:', error);
    }
},
}));

export default AdminStore;
