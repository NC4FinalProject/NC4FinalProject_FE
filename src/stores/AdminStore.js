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
  form: {
    userPw: '',
    userPwChk: ''
  },
  pwValidation: false,
  pwChk: false,
  searchCondition: 'all',
  searchKeyword: '',
  preTeacherCount: 0,
  daliyOutUserCount: [],
  monthlyOutUserCount: [],
  preTeachers: [],
  todayUserCount: 0,
  setTodayUserCount: (todayUserCount) => set({ todayUserCount }),
  setForm: (newForm) => set({ form: newForm }),
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
            ,setDailyOutUserCount,setMonthlyOutUserCount,setPreTeachers,setTodayUserCount } = get();
    try {
        const response = await axios.get('http://localhost:9090/admin/main', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        const { notices, recentUsers, registrationCounts,
                monthlytotalUserCount,monthlyCounts,preTeacherCount,daliyOutUserCount, monthlyOutUserCount,preTeachers,todayUserCount } = response.data;
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
        console.log(response.data.content);
        setPage(response.data.pageable.pageNumber);
       setMemberInfo(response.data);
    } catch (error) {
        console.log('에러:', error);
    }
},

userDetail: async (userId) => {
    const { setMemberInfo, setMemo } = get();
    try {
        const response = await axios.get(`http://localhost:9090/admin/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        setMemberInfo(response.data);
        setMemo(response.data.memo);
    } catch (error) {
        console.log('에러:', error);
    }
},
}));

export default AdminStore;
