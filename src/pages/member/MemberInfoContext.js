import React, {useState} from 'react';

export const MemberInfoContext = React.createContext();

export const MemberInfoProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({
        memberId: "",
        username: "",
        userNickname: "",
    });

    return (
        <MemberInfoContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </MemberInfoContext.Provider>
    );
};