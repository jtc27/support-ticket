//check if user is logged in

import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
// useSelector to select user from redux state to see if user is logged in

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  const {user} = useSelector((state) => state.auth)

  useEffect(() =>{
    if(user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    setCheckingStatus(false)

  }, [user]) //user is dependency.  useEffect runs when user changes

  return{loggedIn, checkingStatus} //accessed by PrivateRoute.jsx component
}