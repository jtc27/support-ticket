import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'

import {getTickets, reset} from '../features/tickets/ticketSlice'

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Tickets() {

  const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)

  const dispatch = useDispatch()

  // Clears the state on unmount, or there will be errors
  useEffect(() => {
    //if we want something to happen on unmount, we need to return a function from useEffect (see the Firebase project)
    return() => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])
  // This is a seperate useEffect but it can also be done in the same one as below

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <div>
      Tickets
    </div>
  )
}

export default Tickets