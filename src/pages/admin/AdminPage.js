import React, {useEffect, useState} from 'react';
import {MenuContext} from './MenuContext';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MemberStore from '../../stores/MemberStore';

const AdminPage = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [submenuOpen, setSubmenuOpen] = React.useState({});
    const [selectedSubmenu1, setSelectedSubmenu1] = useState(null);
    const [selectedSubmenu2, setSelectedSubmenu2] = useState(null);
    const {memberInfo} = MemberStore();
    const navi = useNavigate();
    useEffect(() => {
      if (memberInfo.role !== 'ADMIN') {
        alert('접근 권한이 없습니다.');
        navi('/');
      }
    }, [memberInfo.role, navi]);

    const toggleSubmenu = (menuName) => {
        setSubmenuOpen({
            ...submenuOpen,
            [menuName]: !submenuOpen[menuName],
        });
        setSelectedSubmenu1(null);
        setSelectedSubmenu2(null);
    };

    const handleImgClick = () => {
        setSelectedSubmenu1(null);
        setSelectedSubmenu2(null);
        };

   const ContentPage = (value) => {
            if (value === '게시물 관리') {
                navi('/admin/contents');
      }
        setSelectedSubmenu2(value);
    };

    const changePage = (submenu) => {
        if (submenu === '사용자 관리') {
            navi('/admin/user');
        }
        if (submenu === '신고 관리') {
            navi('/admin/report');
        }
        if (submenu === '1 대 1 문의') {
            navi('/admin/qna');
        }
        setSelectedSubmenu1(submenu === selectedSubmenu1 ? null : submenu);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#D0DBE8';
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    return (
        <MenuContext.Provider value={{isMenuOpen, toggleMenu}}>
            <Drawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '15rem',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={isMenuOpen}
            >
                <Link to="/admin/main" style={{textDecoration: 'none', color: 'inherit'}}>
                    <img
                        src="/images/team_logo.png"
                        alt="team_logo"
                        height="30rem"
                        width="150rem"
                        style={{paddingTop: "2rem", cursor: "pointer"}}
                        onClick={handleImgClick}
                    />
                </Link>
                <List>
                    <ListItem
                        button
                        onClick={toggleMenu}
                        sx={{
                            display: '-webkit-inline-box',
                            '&:hover': {
                                color: '#558BCF',
                                '& .MuiSvgIcon-root': {
                                    fill: '#558BCF',
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{minWidth: '2.5rem'}}>
                            <MenuIcon sx={{color: isMenuOpen ? 'inherit' : '#558BCF'}}/>
                        </ListItemIcon>
                        <ListItemText primary="메뉴"/>
                    </ListItem>
                    <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItem
                            button
                            onClick={toggleMenu}
                            sx={{
                                display: 'flex',
                                '&:hover': {
                                    color: '#558BCF',
                                    '& .MuiSvgIcon-root': {
                                        fill: '#558BCF',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{minWidth: '2.5rem'}}>
                                <HomeIcon sx={{color: isMenuOpen ? 'inherit' : '#558BCF'}}/>
                            </ListItemIcon>
                            <ListItemText primary="홈페이지 이동"/>
                        </ListItem>
                    </Link>
                    <ListItem
                        button
                        onClick={() => toggleSubmenu("메뉴 1")}
                        sx={{textAlign: '-webkit-center', color: submenuOpen["메뉴 1"] ? '#558BCF' : ''}}
                    >
                        <GroupIcon sx={{marginRight: '1rem', color: submenuOpen["메뉴 1"] ? '#558BCF' : ''}}/>
                        <ListItemText primary="사용자 관리"/>
                        <KeyboardArrowDownIcon sx={{color: submenuOpen["메뉴 1"] ? '#558BCF' : ''}}/>
                    </ListItem>
                    {submenuOpen["메뉴 1"] && (
                        <List>
                            {['사용자 관리', '1 대 1 문의', '신고 관리'].map((submenu, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={() => changePage(submenu)}
                                    sx={{
                                        textAlign: '-webkit-center',
                                        color: selectedSubmenu1 === submenu ? '#558BCF' : ''
                                    }}
                                >
                                    <ListItemText primary={submenu}/>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <ListItem
                        button
                        onClick={() => toggleSubmenu("메뉴 2")}
                        sx={{textAlign: '-webkit-center', color: submenuOpen["메뉴 2"] ? '#558BCF' : ''}}
                    >
                        <CreateIcon sx={{marginRight: '0.725rem', color: submenuOpen["메뉴 2"] ? '#558BCF' : ''}}/>
                        <ListItemText primary="게시글 관리"/>
                        <KeyboardArrowDownIcon sx={{color: submenuOpen["메뉴 2"] ? '#558BCF' : ''}}/>
                    </ListItem>
                    {submenuOpen["메뉴 2"] && (
                        <List>
                                <ListItem
                                    button
                                    onClick={() => ContentPage(selectedSubmenu2 === '게시물 관리' ? '' : '게시물 관리')}
                                    sx={{
                                        textAlign: '-webkit-center',
                                        color: selectedSubmenu2 === '게시물 관리' ? '#558BCF' : ''}}
                                >
                                    <ListItemText primary='게시물 관리'/>
                                </ListItem>
                        </List>
                    )}
                </List>
            </Drawer>
            {children}
            <Outlet/>
        </MenuContext.Provider>
    );
};

export default AdminPage;
