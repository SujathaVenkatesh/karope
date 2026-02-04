import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Dash from "./Components/Dash.jsx";
import User from "./Components/User.jsx";
import Support from "./Components/Support.jsx";
import SupportUser from "./Components/UserMessages.jsx";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dash />} />
          <Route path="/user" element={<User />} />
          <Route path="/frequent" element={<Support />} />
          <Route path="/support" element={<SupportUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
