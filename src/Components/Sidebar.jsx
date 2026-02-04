import {
  FaHome,
  FaUsers,
  FaExchangeAlt,
  FaThLarge,
  FaBell,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaMobileAlt,
} from "react-icons/fa";
import '../Style/sidebar.css'

import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside
      className="sidebar text-white position-fixed top-0 start-0 vh-100 d-none d-lg-flex flex-column" style={{ backgroundColor: "#399c41" }}>
      {/* Logo */}
      <div className="text-center py-4 fs-4 fw-bold">
        LOGO
      </div>

      {/* Menu */}
      <ul className="nav flex-column px-3 gap-3 fs-6 poppins-regular">

        <Link to="/dash" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-3">
          <FaHome size={23} /> DASHBOARD
        </li> </Link>

        <Link to="/user" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-3 mt-2">
          <FaUsers size={23} /> USERS
        </li> </Link>

        <li className="nav-item d-flex align-items-center gap-3 mt-2">
          <FaExchangeAlt size={23} /> TRANSACTION
        </li>
        <li className="nav-item d-flex align-items-center gap-3 mt-2">
          <FaThLarge size={23} /> MENU
        </li>

        <Link to='/operatorsetting' className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-3 mt-2">
          <FaMobileAlt size={23} /> OPERATOR
        </li> </Link>

        <li className="nav-item d-flex align-items-center gap-3 mt-2">
          <FaBell size={23} /> NOTIFICATIONS
        </li>

        <li className="nav-item d-flex align-items-center gap-3 mt-2">
          <FaHeadset size={23} /> SUPPORT
        </li>

        <Link to="/settings" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-3 mt-2">
          <FaCog size={23} /> SETTINGS
        </li> </Link>
      </ul>

      {/* Logout */}
      <div className="mt-auto p-3">
        <button className="btn btn-light w-100 text-color poppins-medium d-flex align-items-center justify-content-center gap-2">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
