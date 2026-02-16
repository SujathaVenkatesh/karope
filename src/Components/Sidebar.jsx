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
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Style/sidebar.css";
import logo from "../assets/img/logo.png";
import { useLogoutMutation } from "../Redux/Api/Api.js";
import useToken from "../Redux/Local/userToken.js";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  console.log("Current path:", location);
  const [logout] = useLogoutMutation();
  const menuItem = (to, icon, label) => (
    <Link to={to} className="sidebar-link">
      <li
        className={`sidebar-item ${
          location.pathname.startsWith(to) ? "active" : ""
        }`}
      >
        {icon}
        <span>{label}</span>
      </li>
    </Link>
  );
const { token, setToken } = useToken()
const handleLogout = () => {
 logout().unwrap().then((res) => {
  console.log("Logout successful:", res);
    setToken(null)
    navigate("/");
    const modal = document.getElementById("logoutModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  })
  .catch((error) => {
    console.error("Logout failed:", error);
    setToken(null)
    navigate("/");
    const modal = document.getElementById("logoutModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
   
  }); 

  // close bootstrap modal manually
  

  // navigate to login

};


  return (
    <>
      <aside className="sidebar">
        {/* LOGO */}
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
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

        {/* LOGOUT BUTTON */}
        <div className="sidebar-logout">
          <button
            className="btn btn-success w-100"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* LOGOUT CONFIRM MODAL */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
<div className="modal-header text-white" style={{ backgroundColor: "#3c9b3f" }}>
  <h5 className="modal-title poppins-semibold">Confirm Logout</h5>
  <button
    type="button"
    className="btn-close btn-close-white"
    data-bs-dismiss="modal"
  ></button>
</div>


            <div className="modal-body poppins-regular">
              Are you sure you want to logout?
            </div>

            <div className="modal-footer">
              {/* Cancel */}
              <button
                type="button"
                className="btn btn-secondary poppins-semibold"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              {/* Confirm Logout */}
<button
  type="button"
  className="btn poppins-semibold"
  style={{ backgroundColor: "#3c9b3f", color: "#fff" }}
  data-bs-dismiss="modal"
  onClick={handleLogout}
>
  Logout
</button>



            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
