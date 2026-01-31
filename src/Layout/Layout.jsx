import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import '../Style/layout.css'

const Layout = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow-1 content-wrapper">
        <div className="container-fluid py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
