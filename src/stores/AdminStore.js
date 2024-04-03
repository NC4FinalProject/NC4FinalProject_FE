import create from 'zustand';
import axios from 'axios';

const AdminStore = create((set, get) => ({
  Notices: [],
  Users: [],
  NewUser: [],
  DailytotalUserCount: [],
  MonthlytotalUserCount: [],
  MonthlyCounts: [],
  userRole: 'null',
  MemberInfo: [],
  page: 0,
  searchCondition: 'all',
  searchKeyword: '',
  setSearchCondition: (searchCondition) => set({ searchCondition }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
  setPage: (page) => set({ page }),
  setMemberInfo: (MemberInfo) => set({ MemberInfo }),
  setUserRole: (userRole) => set({ userRole }),
  setMonthlyCounts: (MonthlyCounts) => set({ MonthlyCounts }),
  setMonthlytotalUserCount: (MonthlytotalUserCount) => set({ MonthlytotalUserCount }),
  setDaulyTotalUserCount: (DailytotalUserCount) => set({ DailytotalUserCount }),
  setNewUser: (NewUser) => set({ NewUser }),
  setUsers: (Users) => set({ Users }),
  setNotices: (Notices) => set({ Notices }),

  
  userNotice: async () => {
    const { setNotices, setUsers, setNewUser, setDaulyTotalUserCount,setMonthlytotalUserCount,setMonthlyCounts } = get();
    try {
        const response = await axios.get('http://localhost:9090/admin/main', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        const { notices, recentUsers, registrationCounts, dailytotalUserCount,monthlytotalUserCount,monthlyCounts } = response.data;
        setNotices(notices);
        setUsers(recentUsers);
        setNewUser(registrationCounts)   
        setDaulyTotalUserCount(dailytotalUserCount);
        setMonthlytotalUserCount(monthlytotalUserCount);
        setMonthlyCounts(monthlyCounts);
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
        console.log(response.data);
        setPage(response.data.pageable.pageNumber);
       setMemberInfo(response.data);
    } catch (error) {
        console.log('에러:', error);
    }
},
}));

export default AdminStore;
