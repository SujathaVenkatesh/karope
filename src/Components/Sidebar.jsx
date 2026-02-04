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

        <li className="sidebar-item">
          <FaCog />
          <span>SETTINGS</span>
        </li>
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
