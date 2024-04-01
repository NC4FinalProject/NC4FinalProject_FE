import create from 'zustand';
import axios from 'axios';

const AdminStore = create((set, get) => ({
  notices: [],
  users: [],
  setUsers: (users) => set({ users }),
  setNotices: (notices) => set({ notices }),

  userNotice: async () => {
    const { setNotices, setUsers } = get();
    try {
        const response = await axios.get('http://localhost:9090/admin/main', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        const { notices, recentUsers } = response.data;
        setNotices(notices);
        setUsers(recentUsers);
    } catch (error) {
        console.log('에러:', error);
    }
},
}));

export default AdminStore;
