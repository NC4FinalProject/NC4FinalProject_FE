import create from 'zustand';
import {persist} from 'zustand/middleware';

const MemberStore = create(persist((set, get) => ({
    memberInfo: {
        role: "",
        memberId: "",
        username: "",
        userNickname: "",
        profileFile: null,
    },
    setMemberInfo: (memberInfo) => set({memberInfo}),
}), {
    name: 'member-store',
    getStorage: () => sessionStorage,
},

));

export default MemberStore;