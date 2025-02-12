import Navbar from "src/components/Navbar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div>
        <div className="d-flex flex-col justify-between items-center h-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
