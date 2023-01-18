import { Route, Routes } from 'react-router-dom'
import Landing from 'scenes/landing'
import Error from 'pages/Error'
import Layout from 'scenes/layout'
import Login from 'scenes/login'

// import PrivateRoute from 'middleware/PrivateRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* These routes do not require protection and can be accessed by all */}
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<Error />} />
        <Route path="/login" element={<Login />} />

        {/* A PrivateRoute can only be accessed by a logged in user */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}
      </Route>
    </Routes>
  )
}

export default AppRoutes
