import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import Dash from './Components/Dash.jsx'
import User from './Components/User.jsx'
import UserDetails from './Components/UserDetails.jsx'
import Operatorsetting from './Components/Operatorsetting.jsx'
import Settings from './Components/Settings.jsx'
import Login from './Components/Login.jsx'


const routes = () => {
  return (
    <BrowserRouter>
      <Routes>

         <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path='/dash' element={<Dash />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/operatorsetting" element={<Operatorsetting />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default routes