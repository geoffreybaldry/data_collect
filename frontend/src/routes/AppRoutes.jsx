import { Route, Routes } from 'react-router-dom'
import Landing from 'scenes/landing'
import Error from 'pages/Error'
import Layout from 'scenes/layout'
import Login from 'scenes/login'
import Dashboard from 'scenes/dashboard'
import NetappCVOVolumes from 'scenes/netappcvo/volumes'
import NetappCVOAggregates from 'scenes/netappcvo/aggregates'
import NetappCVOWorkingEnvironments from 'scenes/netappcvo/workingEnvironments'
import NetappCVONodes from 'scenes/netappcvo/nodes'
import NetappCVOInstances from 'scenes/netappcvo/instances'
import NetappCVOProviderVolumes from 'scenes/netappcvo/providerVolumes'
import NetappCVOCredentials from 'scenes/netappcvo/credentials'

import PrivateRoute from 'middleware/PrivateRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* These routes do not require protection and can be accessed by all */}
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<Error />} />
        <Route path="/login" element={<Login />} />

        {/* A PrivateRoute can only be accessed by a logged in user */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/netappcvo/volumes" element={<NetappCVOVolumes />} />
          <Route
            path="/netappcvo/aggregates"
            element={<NetappCVOAggregates />}
          />
          <Route
            path="/netappcvo/workingEnvironments"
            element={<NetappCVOWorkingEnvironments />}
          />
          <Route path="/netappcvo/nodes" element={<NetappCVONodes />} />
          <Route path="/netappcvo/instances" element={<NetappCVOInstances />} />
          <Route
            path="/netappcvo/providerVolumes"
            element={<NetappCVOProviderVolumes />}
          />
          <Route
            path="/netappcvo/credentials"
            element={<NetappCVOCredentials />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
