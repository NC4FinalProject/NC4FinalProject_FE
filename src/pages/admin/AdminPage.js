import React, { useEffect, useState } from "react";
import AdminLayout from '../admin/AdminLayout'; 
import { MenuContext } from "../admin/MenuContext";

const AdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    document.body.style.backgroundColor = '#558BCF';
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      <AdminLayout/>
    </MenuContext.Provider>
  );
};

export default AdminPage;
