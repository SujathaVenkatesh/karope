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
  FaBars
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../Style/sidebar.css";
import logo from '../assets/img/logo.png'

const Sidebar = () => {
  const location = useLocation();

  const menuItem = (to, icon, label) => (
    <Link to={to} className="sidebar-link">
      <li
        className={`sidebar-item ${location.pathname.startsWith(to) ? "active" : ""
          }`}
      >
        {icon}
        <span>{label}</span>
      </li>
    </Link>
  );

  return (
    <aside className="sidebar ">
      {/* LOGO */}
      <div className="sidebar-logo">
        <img src={logo} alt="logo" className=""/>
      </div>

      {/* MENU */}
      <ul className="sidebar-menu">
        {menuItem("/dash", <FaHome />, "DASHBOARD")}
        {menuItem("/user", <FaUsers />, "USERS")}

        {menuItem("/transaction", <FaExchangeAlt />, "TRANSACTIONS")}
        {menuItem("/menu", <FaThLarge />, "MENU")}
        {menuItem("/banner", <FaBars />, "BANNER")}
        {menuItem("/operatorsetting", <FaMobileAlt />, "OPERATOR")}
        {menuItem("/notification", <FaBell />, "NOTIFICATION")}
        {menuItem("/frequent", <FaHeadset />, "SUPPORT")}
        {menuItem("/settings", <FaCog />, "SETTINGS")}


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