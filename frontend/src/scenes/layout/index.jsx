import React, { useState } from 'react'
import { Box, useMediaQuery, Divider } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import ProSideBar from 'components/ProSideBar'
// import { useProSidebar } from 'react-pro-sidebar/dist/hooks/useProSidebar'

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)')
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { user } = useSelector((state) => state.auth)

  // const { collapseSidebar } = useProSidebar();

  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      {user && (
        // <Sidebar
        //   user={user}
        //   isNonMobile={isNonMobile}
        //   drawerWidth="300px"
        //   isSidebarOpen={isSidebarOpen}
        //   setIsSidebarOpen={setIsSidebarOpen}
        // />
        <ProSideBar />
      )}

      <Box flexGrow={1}>
        <Navbar
          user={user ? user : null}
          // isSidebarOpen={isSidebarOpen}
          // setIsSidebarOpen={setIsSidebarOpen}
          // collapseSidebar={collapseSidebar}
        />
        <Divider />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
