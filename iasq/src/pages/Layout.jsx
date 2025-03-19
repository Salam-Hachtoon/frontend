import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="grid grid-cols-[16%_84%] h-screen">
       {/*Sidebar fixed*/}
       <Sidebar></Sidebar> 

       {/* Changeable Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;