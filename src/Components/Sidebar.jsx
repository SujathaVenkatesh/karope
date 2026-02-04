import {
  FaHome,
  FaUsers,
  FaExchangeAlt,
  FaThLarge,
  FaBell,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import '../Style/sidebar.css'

import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside
      className="sidebar text-white position-fixed top-0 start-0 vh-100 d-none d-lg-flex flex-column" style={{backgroundColor:"#399c41"}}>
      {/* Logo */}
      <div className="text-center py-4 fs-4 fw-bold">
        LOGO
      </div>

      {/* Menu */}
      <ul className="nav flex-column px-3 gap-3 fs-6">
      
      <Link to="/" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-2">
          <FaHome /> Dashboard
        </li> </Link> 

      <Link to="/user" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-2">
          <FaUsers /> Users
        </li> </Link>

        <Link to="/transaction" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-2">
          <FaExchangeAlt /> Transactions
        </li> </Link>
        <li className="nav-item d-flex align-items-center gap-2">
          <FaThLarge /> Menu
        </li>
        <li className="nav-item d-flex align-items-center gap-2">
          <FaBell /> Notification
        </li>
        <li className="nav-item d-flex align-items-center gap-2">
          <FaHeadset /> Support
        </li>
        <li className="nav-item d-flex align-items-center gap-2">
          <FaCog /> Settings
        </li>
      </ul>

      {/* Logout */}
      <div className="mt-auto p-3">
        <button className="btn btn-light w-100 text-color fw-bold d-flex align-items-center justify-content-center gap-2">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
