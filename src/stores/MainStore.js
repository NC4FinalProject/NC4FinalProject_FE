import create from 'zustand';
import axios from 'axios';
const MainStore = create((set, get) => ({
bestContents: [],
recentContents: [],
randomContents: [],
recentComments: [],
askUser: '',
category: '',
content:'',
setContent: (content) => set({ content }),
setCategory: (category) => set({ category }),
setAskUser: (askUser) => set({ askUser }),
setRecentComments: (recentComments) => set({ recentComments }),
setRandomContents: (randomContents) => set({ randomContents }),
setRecentContents: (recentContents) => set({ recentContents }),
setBestContents: (bestContents) => set({ bestContents }),

getMainContents: async () => {
        const { setRecentComments, setRandomContents , setRecentContents, setBestContents} = get();
        try {
            const response = await axios.get('http://localhost:9090/');
            const { bestContents, recentContents, randomContents, recentComment } = response.data;
            console.log(response.data);
            setRecentComments(recentComment);
            setRandomContents(randomContents);
            setRecentContents(recentContents);
            setBestContents(bestContents);
        } catch (error) {
            console.log('에러:', error);
        }
    },

sendQna: async (askUser, category, content) => {
    try {
    await axios.post('http://localhost:9090/sendqna',{
        askUser: askUser,
        category: category,
        content: content,
        createdAt: new Date().toISOString()
    });
    console.log("잘되었나.")
} catch(error) {
    console.log(error);
}
}
}))

export default MainStore;