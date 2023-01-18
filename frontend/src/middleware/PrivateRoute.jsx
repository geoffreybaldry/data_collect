import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// Routes that are only available when a user has logged in
const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth)

  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <>
      {toast.error('Route requires a logged in user')}
      <Navigate
        replace
        to={'/login'}
        location={{ from: location.pathname + location.search }}
      />
    </>
  )
}

export default PrivateRoute
