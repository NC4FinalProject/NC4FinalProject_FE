import create from 'zustand';

const MemberStore = create((set, get) => ({
    userRole: 'null',
    setUserRole: (userRole) => set({userRole}),
}));

export default MemberStore;