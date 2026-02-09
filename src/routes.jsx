import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import Dash from './Components/Dash.jsx'
import User from './Components/User.jsx'
import Transaction from './Components/Transaction.jsx'
import UserDetails from './Components/UserDetails.jsx'
import Operatorsetting from './Components/Operatorsetting.jsx'
import Support from "./Components/Support.jsx";
import SupportUser from "./Components/UserMessages.jsx";
import Settings from './Components/Settings.jsx'
import Login from './Components/Login.jsx'
import Menu from './Components/Menu.jsx'
import Notification from './Components/Notification.jsx'
import Banner from './Components/Banner.jsx'
import useToken from './Redux/Local/userToken.js'


const routes = () => {

  const { token } = useToken();

  console.log("token", token);

  return (


    <Routes>
      {!token ? (
        <Route path="/" element={<Login />} />
      ) : (
        <Route element={<Layout />}>
          <Route path='/dash' element={<Dash />} />
          <Route path='/' element={<Dash />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/operatorsetting" element={<Operatorsetting />} />
          <Route path="/frequent" element={<Support />} />
          <Route path="/support" element={<SupportUser />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/transaction" element={<Transaction />} />
        </Route>
      )}




    </Routes>

  )
}


export default routes;
