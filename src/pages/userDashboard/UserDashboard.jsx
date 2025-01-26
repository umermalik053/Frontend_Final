import Navbar from '@/component/Navbar'
import Sidebar from '@/component/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const UserDashboard = () => {
  return (
    <div>
      <Sidebar/>
      <div class="p-16 mr-20 mt-10 sm:ml-64">
        <Outlet />
      </div>
    </div>
  )
}

export default UserDashboard
