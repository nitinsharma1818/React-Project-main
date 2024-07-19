import React from "react";
import { useLocation } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";
import UserHeader from "../user/UserHeader";

/**Both the user and admin header are wrapped here */
const Header = () => {
  const location = useLocation()
  const paths = location.pathname.split('/')
  return(<>
        {
            paths.includes('admin')? <AdminHeader /> : <UserHeader />
        }
  </>)
}

export default Header