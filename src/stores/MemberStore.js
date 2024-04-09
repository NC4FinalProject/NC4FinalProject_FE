import create from 'zustand';
import {persist} from 'zustand/middleware';

const MemberStore = create(persist((set, get) => ({
    userRole: 'null',
    setUserRole: (userRole) => set({userRole}),
    memberInfo: {
        memberId: "",
        username: "",
        userNickname: "",
    },
    setMemberInfo: (memberInfo) => set({memberInfo}),
}), {
    name: 'member-store',
    getStorage: () => sessionStorage,
}));

export default MemberStore;
