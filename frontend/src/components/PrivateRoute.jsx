import {Navigate, Outlet} from 'react-router-dom'
import Spinner from './Spinner'

import { useAuthStatus } from '../hooks/useAuthStatus'
//our hook

const PrivateRoute = () => {
  
  const {loggedIn, checkingStatus} = useAuthStatus()

  if (checkingStatus) {
    return <Spinner/>
  }

  return loggedIn ? <Outlet/> : <Navigate to='/login' />
  //if it's logged in, proceeds to the route
  //else it navigates to /login

}

export default PrivateRoute