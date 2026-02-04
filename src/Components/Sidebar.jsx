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
import { Link, useLocation } from "react-router-dom";
import "../Style/sidebar.css";
import logo from '../assets/img/logo.jpeg'

const Sidebar = () => {
  const location = useLocation();

  const menuItem = (to, icon, label) => (
    <Link to={to} className="sidebar-link">
      <li
        className={`sidebar-item ${
          location.pathname === to ? "active" : ""
        }`}
      >
        {icon}
        <span>{label}</span>
      </li>
    </Link>
  );

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-logo">
        <img src={logo} alt="logo" className="" />
      </div>

      {/* MENU */}
      <ul className="sidebar-menu">
        {menuItem("/", <FaHome />, "DASHBOARD")}
        {menuItem("/user", <FaUsers />, "USERS")}
        <li className="sidebar-item">
          <FaExchangeAlt />
          <span>TRANSACTIONS</span>
        </li>
        <li className="sidebar-item">
          <FaThLarge />
          <span>MENU</span>
        </li>
        <li className="sidebar-item">
          <FaUsers />
          <span>OPERATOR</span>
        </li>
        <li className="sidebar-item">
          <FaBell />
          <span>NOTIFICATION</span>
        </li>

        {menuItem("/frequent", <FaHeadset />, "SUPPORT")}


        <Link to="/settings" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-3 mt-2">
          <FaCog size={23} /> SETTINGS
        </li> </Link>

        <Link to="/transactions" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-2">
          <FaExchangeAlt /> Transactions
        </li> </Link>
        <Link to="/menu" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-2">
          <FaThLarge /> Menu
        </li> </Link> 
        <Link to="/notification" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-2">
          <FaBell /> Notification
        </li> </Link>
        <Link to="/support" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-2">
          <FaHeadset /> Support
        </li> </Link>
        <Link to="/settings" className="text-decoration-none text-white"> <li className="nav-item d-flex align-items-center gap-2">
          <FaCog /> Settings
        </li> </Link>
      </ul>

      {/* LOGOUT */}
      <div className="sidebar-logout">
        <button>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
